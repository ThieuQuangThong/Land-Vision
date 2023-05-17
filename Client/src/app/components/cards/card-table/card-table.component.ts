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
import { DetailPurchaseModel } from "src/app/models/detailPurchase-model";
import { DetailPurchaseService } from "src/app/_service/detail-purchase.service";
import { PROPERTY_INFOR } from "src/assets/common/propertyInfor";
import { AuthService } from "src/app/_service/auth.service";


@Component({
  selector: "app-card-table",
  templateUrl: "./card-table.component.html",
  styleUrls: ['./card-table.component.css']

})

export class CardTableComponent implements OnInit {
  displayedPostsColumns: string[] = ['#', 'title', 'transactionType', 'createAt','seller','status', 'isHide'];
  displayedSellersColumns: string[] = ['#', 'name', 'email', 'phone', 'isHide'];
  displayedRevenuesColumns: string[] = ['#', 'id', 'transactionDate', 'userId', 'vipName','vipPrice'];

  dataSourcePost = new MatTableDataSource<any>();
  dataSourceSeller = new MatTableDataSource<any>();
  dataSourceRevenue = new MatTableDataSource<any>();

  filterOptionOfPosts: string[] = PROPERTY_INFOR.FilterOptionOfPost
  propertyInfor = PROPERTY_INFOR;

  @ViewChild('postPaginator', { static: true }) postPaginator!: MatPaginator;
  @ViewChild('sellerPaginator', { static: true }) sellerPaginator!: MatPaginator;
  @ViewChild('revenuePaginator', { static: true }) revenuePaginator!: MatPaginator;
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

  goToDetail(id : number, approveStatus: number){
    const encodeId = this.auth.encode(id.toString());
    if(approveStatus === this.propertyInfor.isApprove || approveStatus === this.propertyInfor.isReject ){
      this.router.navigate([`/admin/productdetails/${encodeId}`])
    }
    else if(approveStatus === this.propertyInfor.isPending){
      this.router.navigate([`/admin/approveDetail/${encodeId}`])
    }
  }

  postRespone: PostModel[] = [];
  userRespone: UserModel[] = [];
  detailPurchase: DetailPurchaseModel[] = [];

  @Input()
  get color(): string {
    return this._color;
  }
  set color(color: string) {
    this._color = color !== "light" && color !== "dark" ? "light" : color;
  }
  private _color = "light";

  constructor(private postService:PostService, private auth: AuthService, private userService : UserService, private router : Router, private detailPurchaseService : DetailPurchaseService) {}

  filterOption(event: any){
    const value = Number(this.getEventValue(event));
    switch (value) {
      case PROPERTY_INFOR.ApproveFilterOption:
        this.getApprovedPost();
        break;

      case PROPERTY_INFOR.PendingFilterOption:
        this.getUnApprovedPost();
        break;

      case PROPERTY_INFOR.RejectFilterOption:
        this.getRejectedPost();
        break;

      case PROPERTY_INFOR.all:
        this.getAll();
        break;

      default:
        break;
    }
  }

  getEventValue(event: any): string{
    const selectElement = event.target as HTMLSelectElement;
    const selectedOption = selectElement.selectedOptions[0];
    const selectedOptionText = selectedOption.value;
    return selectedOptionText ?? "";
  }

  ngOnInit(): void {
    this.getAll();
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


  getAll() :void{
    this.postService.getAllPost(this.paging)
    .subscribe(
      respone =>{
        this.postRespone = respone.listItem;
        this.dataSourcePost = new MatTableDataSource(this.postRespone);
        this.dataSourcePost.sort = this.sort;
        this.dataSourcePost.paginator = this.postPaginator;
      }
    )
  }

  getRejectedPost(){
    this.postService.getRejectedPost(this.paging)
    .subscribe(
      respone =>{
        this.postRespone = respone.listItem;
        this.dataSourcePost = new MatTableDataSource(this.postRespone);
        this.dataSourcePost.sort = this.sort;
        this.dataSourcePost.paginator = this.postPaginator;
      }
    )
  }

  getApprovedPost(): void{
    this.postService.getAllApprovePost(this.paging)
    .subscribe(
      respone =>{
        this.postRespone = respone.listItem;
        this.dataSourcePost = new MatTableDataSource(this.postRespone);
        this.dataSourcePost.sort = this.sort;
        this.dataSourcePost.paginator = this.postPaginator;
      }
    )
  }

  getUnApprovedPost(): void{
    this.postService.getUnapprovedPosts(this.paging)
    .subscribe(
      respone =>{
        this.postRespone = respone.listItem;
        this.dataSourcePost = new MatTableDataSource(this.postRespone);
        this.dataSourcePost.sort = this.sort;
        this.dataSourcePost.paginator = this.postPaginator;
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
