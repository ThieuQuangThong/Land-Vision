import { Component, OnInit, Input, OnChanges,SimpleChanges, ViewChild } from "@angular/core";
import { PostService } from "src/app/_service/post.service";
import { PagingModel } from "src/app/models/paging-model";
import { PostModel } from "src/app/models/post-model";
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { UserService } from "src/app/_service/user.service";
import { UserModel } from "src/app/models/user-model";
import {MatSort, Sort} from '@angular/material/sort';
import { Router } from "@angular/router";


@Component({
  selector: "app-card-table",
  templateUrl: "./card-table.component.html",
  styleUrls: ['./card-table.component.css']

})

export class CardTableComponent implements OnInit {
  displayedPostsColumns: string[] = ['#', 'title', 'transactionType', 'createAt','poster', 'isHide'];
  displayedSellersColumns: string[] = ['#', 'name', 'email', 'phone', 'dropDown'];

  dataSourcePost = new MatTableDataSource<any>();
  dataSourceSeller = new MatTableDataSource<any>();

  @ViewChild('postPaginator', { static: true }) postPaginator!: MatPaginator;
@ViewChild('sellerPaginator', { static: true }) sellerPaginator!: MatPaginator;
@ViewChild('empTbSort') empTbSort = new MatSort();

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  options : object = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  form = new FormGroup({
    fromDate: new FormControl(),
    toDate: new FormControl()
  });
  get fromDate() { return this.form.get('fromDate')!.value; }
  get toDate() { return this.form.get('toDate')!.value; }
  paging: PagingModel = {
    skipCount : 0,
    maxResultCount : 100,
  }

  goToDetail(id : number){
    this.router.navigate([`productdetails/${id}`])
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

  constructor(private postService:PostService, private userService : UserService, private router : Router) {
    const now = new Date();


  }

  ngOnInit(): void {
    this.getAll(this.paging);
  }
  ngAfterViewInit() {
    this.dataSourcePost.sort = this.empTbSort;
    this.dataSourceSeller.sort = this.empTbSort;

}
  applyDateFilter()  {
      this.dataSourcePost.filterPredicate = (data, filter) =>{
        const day = new Date(data.createDate).getDate(); // Lấy ngày trong tháng (1-31)
        const year = new Date(data.createDate).getFullYear(); // Lấy năm (4 chữ số)
        const month = new Date(data.createDate).getMonth() + 1; // Lấy tháng (0-11) và cộng thêm 1 để đưa về dạng 1-12
          const createDate = new Date(year, month - 1, day);
          console.log(createDate+","+this.fromDate+','+this.toDate);
        if (this.fromDate && this.toDate) {
          return createDate >= this.fromDate && createDate <= this.toDate;
        }
        return true;
      }
    this.dataSourcePost.filter = ''+Math.random();
  };

  hideUnhide(postId : number){
    this.postService.hideUnhidePost(postId)
    .subscribe(
      _ =>{
        const test = this.postRespone.map(x => {
          if(x.id === postId){
            x.isHide = !x.isHide
          }
          return x;
        })
        this.postRespone = test;
        this.dataSourcePost = new MatTableDataSource(this.postRespone);

        this.dataSourcePost.sort = this.sort;
        this.dataSourcePost.paginator = this.postPaginator;
      }

    );

  }


  getAll(paging: PagingModel) :void{
    this.postService.getAllPost(paging)
    .subscribe(
      respone =>{
        this.postRespone = respone.listItem;
        this.dataSourcePost = new MatTableDataSource(this.postRespone);

        this.dataSourcePost.sort = this.sort;
        this.dataSourcePost.paginator = this.postPaginator;
      }
    )
    this.userService.getAllUser(paging)
    .subscribe(
      respone =>{
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

    if (this.dataSourcePost.paginator) {
      this.dataSourcePost.paginator.firstPage();
    }
  }

}
