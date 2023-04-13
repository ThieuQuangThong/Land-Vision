import { Component, OnInit, Input, OnChanges,SimpleChanges } from "@angular/core";
import { PostService } from "src/app/_service/post.service";
import { PagingModel } from "src/app/models/paging-model";
import { PostModel } from "src/app/models/post-model";

@Component({
  selector: "app-card-table",
  templateUrl: "./card-table.component.html",
})
export class CardTableComponent implements OnInit, OnChanges  {
  options : object = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  stDate: Date = new Date() ;
  enDate:Date = new Date();
  startDate :string ="";
  endDate : string = this.enDate.toLocaleDateString(undefined, this.options);

  paging: PagingModel = {
    skipCount : 0,
    maxResultCount : 8,
  }
  isFullItem: boolean = false;
  postRespone: PostModel[] = [];
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
  ngOnChanges(simpleChange : SimpleChanges) {
      this.startDate = this.stDate.toLocaleDateString(undefined, this.options);
      this.endDate = this.enDate.toLocaleDateString(undefined, this.options);
      this.getPostByTime(this.paging,this.startDate.toString(),this.endDate.toString())
      console.log(this.startDate+","+this.endDate)
  }
  getPostByTime(paging: PagingModel, startdatepickerValue: string,enddatepickerValue: string){
    this.postService.getAllPostByTime(paging, startdatepickerValue,enddatepickerValue)
    .subscribe(
      respone =>{
        var {skipCount, maxResultCount} = respone.pagination;

        this.postRespone = [...this.postRespone, ...respone.listItem];
        paging.skipCount = skipCount + maxResultCount;

        if(paging.skipCount >= respone.totalCount){
          this.isFullItem = true;
        }
      }
    )
  }
}
