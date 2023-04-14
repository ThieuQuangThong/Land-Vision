import { Component, OnInit, Input, OnChanges,SimpleChanges, ViewChild } from "@angular/core";
import { PostService } from "src/app/_service/post.service";
import { PagingModel } from "src/app/models/paging-model";
import { PostModel } from "src/app/models/post-model";
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {MatSort} from "@angular/material/sort";

@Component({
  selector: "app-card-table",
  templateUrl: "./card-table.component.html",
})

export class CardTableComponent implements OnInit {
  displayedPostsColumns: string[] = ['#', 'title', 'transactionType', 'createAt','Poster'];
  displayedSellersColumns: string[] = ['#', 'name', 'email', 'phone','identityNumber','vipLevels'];

  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  stt:number = 0;
  options : object = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  stDate: Date = new Date() ;
  enDate:Date = new Date();
  startDate :string ="";
  endDate : string = this.enDate.toLocaleDateString(undefined, this.options);

  paging: PagingModel = {
    skipCount : 0,
    maxResultCount : 100,
  }
  pagingReset: PagingModel = {
    skipCount : 0,
    maxResultCount : 100,
  }
  isFullItem: boolean = false;
  postRespone: PostModel[] = [];
  public pageSlice : PostModel[] = []
  @Input()
  get color(): string {
    return this._color;
  }
  set color(color: string) {
    this._color = color !== "light" && color !== "dark" ? "light" : color;
  }
  private _color = "light";

  constructor(private postService:PostService) {
    const now = new Date();
    this.stDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    this.startDate = this.stDate.toLocaleDateString(undefined, this.options);

  }
  ngOnInit(): void {
    this.getPostByTime(this.paging,this.startDate.toString(),this.endDate.toString())
  }
   onSubmitTime() {
      this.postRespone= [];
      this.dataSource = new MatTableDataSource(this.postRespone);

      this.startDate = this.stDate.toLocaleDateString(undefined, this.options);
      this.endDate = this.enDate.toLocaleDateString(undefined, this.options);
      this.postService.getAllPostByTime(this.pagingReset, this.startDate.toString(),this.endDate.toString())
    .subscribe(
      respone =>{
        // var {skipCount, maxResultCount} = respone.pagination;
        this.dataSource = new MatTableDataSource(this.postRespone);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.postRespone = [...this.postRespone, ...respone.listItem];
        if(this.pagingReset.skipCount >= respone.totalCount){
          this.isFullItem = true;
        }
      }
    )
   }
  getPostByTime(paging: PagingModel, startdatepickerValue: string,enddatepickerValue: string){
    this.postService.getAllPostByTime(paging, startdatepickerValue,enddatepickerValue)
    .subscribe(
      respone =>{
        var {skipCount, maxResultCount} = respone.pagination;
        this.postRespone = [...this.postRespone, ...respone.listItem];
        this.dataSource = new MatTableDataSource(this.postRespone);
        this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        // this.pageSlice = this.postRespone.slice(0, 100)
        paging.skipCount = skipCount + maxResultCount;
        if(paging.skipCount >= respone.totalCount){
          this.isFullItem = true;
        }
      }
    )
  }
  OnPageChange(event : PageEvent){
    console.log(event);
    const startIndex = event.pageIndex + event.pageSize;
    let endIndex = startIndex + event.pageSize ;
    if(endIndex > this.postRespone.length){
      endIndex = this.postRespone.length
    }
    this.pageSlice = this.postRespone.slice(startIndex -1, endIndex)
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
