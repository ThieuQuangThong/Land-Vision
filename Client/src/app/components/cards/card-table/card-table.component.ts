import { Component, OnInit, Input, OnChanges,SimpleChanges, ViewChild } from "@angular/core";
import { PostService } from "src/app/_service/post.service";
import { PagingModel } from "src/app/models/paging-model";
import { PostModel } from "src/app/models/post-model";
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {MatSort} from "@angular/material/sort";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { UserService } from "src/app/_service/user.service";
import { UserModel } from "src/app/models/user-model";

@Component({
  selector: "app-card-table",
  templateUrl: "./card-table.component.html",
})

export class CardTableComponent implements OnInit {
  displayedPostsColumns: string[] = ['#', 'title', 'transactionType', 'createAt','poster'];
  displayedSellersColumns: string[] = ['#', 'name', 'email', 'phone'];

  dataSourcePost = new MatTableDataSource<any>();
  dataSourceSeller = new MatTableDataSource<any>();

  @ViewChild('postPaginator', { static: true }) postPaginator!: MatPaginator;
@ViewChild('sellerPaginator', { static: true }) sellerPaginator!: MatPaginator;

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  options : object = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  form = new FormGroup({
    fromDate: new FormControl(),
    toDate: new FormControl()
  });
  get fromDate() { return this.form.get('fromDate')!.value; }
  get toDate() { return this.form.get('toDate')!.value; }
  // fromDate: Date | undefined ;
  // toDate: Date = new Date();
  paging: PagingModel = {
    skipCount : 0,
    maxResultCount : 100,
  }
  postRespone: PostModel[] = [];
  userRespone: UserModel[] = [];
  public pageSlice : PostModel[] = []
  @Input()
  get color(): string {
    return this._color;
  }
  set color(color: string) {
    this._color = color !== "light" && color !== "dark" ? "light" : color;
  }
  private _color = "light";

  constructor(private postService:PostService, private userService : UserService) {
    const now = new Date();

    this.dataSourcePost.filterPredicate = (data, filter) =>{
      const day = new Date(data.createDate).getDate(); // Lấy ngày trong tháng (1-31)
      const year = new Date(data.createDate).getFullYear(); // Lấy năm (4 chữ số)
      const month = new Date(data.createDate).getMonth() + 1; // Lấy tháng (0-11) và cộng thêm 1 để đưa về dạng 1-12
        const createDate = new Date(year, month - 1, day);
        console.log(createDate+","+this.fromDate+','+this.toDate);
        // return createDate >= this.fromDate! && createDate
        // <= this.toDate!;
      if (this.fromDate && this.toDate) {
        return createDate >= this.fromDate && createDate <= this.toDate;
      }
      return true;
    }
  }
  ngOnInit(): void {
    this.getAll(this.paging);
  }

  formatDateToDate(date: Date): Date {
    const day = date.getDate(); // Lấy ngày trong tháng (1-31)
    const year = date.getFullYear(); // Lấy năm (4 chữ số)
    const month = date.getMonth() + 1; // Lấy tháng (0-11) và cộng thêm 1 để đưa về dạng 1-12

    // Tạo một đối tượng Date mới với ngày, tháng và năm tương ứng
    const formattedDate = new Date(year, month - 1, day);

    return formattedDate;
  }
  onSubmitTime()  {
    // console.log(this.dataSourcePost.data)
      // this.dataSourcePost = new MatTableDataSource(this.dataSourcePost.data.filter(e=> {
      // const day = new Date(e.createDate).getDate(); // Lấy ngày trong tháng (1-31)
      // const year = new Date(e.createDate).getFullYear(); // Lấy năm (4 chữ số)
      // const month = new Date(e.createDate).getMonth() + 1; // Lấy tháng (0-11) và cộng thêm 1 để đưa về dạng 1-12
      //   const createDate = new Date(year, month - 1, day);
      //   const fromDate = this.form.fromDate;
      //   const toDate = this.toDate;
      //   console.log(createDate+","+fromDate+','+toDate);
      //   return createDate >= this.fromDate! && createDate
      //   <= this.toDate!;
      // })
      // );
    this.dataSourcePost.filter = ''+Math.random();
  };


  getAll(paging: PagingModel) :void{
    this.postService.getAllPost(paging)
    .subscribe(
      respone =>{
        // var {skipCount, maxResultCount} = respone.pagination;
        this.postRespone = respone.listItem;
        this.dataSourcePost = new MatTableDataSource(this.postRespone);

        this.dataSourcePost.sort = this.sort;
        this.dataSourcePost.paginator = this.postPaginator;
      }
    )
    this.userService.getAllUser(paging)
    .subscribe(
      respone =>{
        // var {skipCount, maxResultCount} = respone.pagination;
        this.userRespone = respone.listItem;
        this.dataSourceSeller = new MatTableDataSource(this.userRespone);
        this.dataSourceSeller.sort = this.sort;
        this.dataSourceSeller.paginator = this.sellerPaginator;
      }
    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourcePost.filter = filterValue.trim().toLowerCase();
    this.dataSourceSeller.filter = filterValue.trim().toLowerCase();

    if (this.dataSourcePost.paginator) {
      this.dataSourcePost.paginator.firstPage();
    }
    if (this.dataSourceSeller.paginator) {
      this.dataSourceSeller.paginator.firstPage();
    }
  }
}
