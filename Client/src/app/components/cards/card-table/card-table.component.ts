import { Component, OnInit, Input,DoCheck } from "@angular/core";
import { PostService } from "src/app/_service/post.service";
import { PagingModel } from "src/app/models/paging-model";
import { PostModel } from "src/app/models/post-model";

@Component({
  selector: "app-card-table",
  templateUrl: "./card-table.component.html",
  styleUrls: ['./card-table.component.css']
})
export class CardTableComponent implements OnInit {
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

  MONTH_NAMES = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  showStartDatepicker = false;
  showEndDatepicker = false;
  startdatepickerValue!: string;
  enddatepickerValue!: string;

  monthStartDate!: number; // !: mean promis it will not be null, and it will definitely be assigned
  yearStartDate!: number;
  monthEndDate!: number; // !: mean promis it will not be null, and it will definitely be assigned
  yearEndDate!: number;
  month!: number; // !: mean promis it will not be null, and it will definitely be assigned
  year!: number;
  no_of_days = [] as number[];
  blankdays = [] as number[];

  constructor(private postService : PostService) {}
  onStartDateChange(newStartDate: string){
    console.log(newStartDate);

  }
  onEndDateChange(newEndDate: string){
    console.log(newEndDate);
  }

  // getPost(paging: PagingModel){
  //   this.postService.getAllPost(paging)
  //   .subscribe(
  //     respone =>{
  //       var {skipCount, maxResultCount} = respone.pagination;

  //       this.postRespone = [...this.postRespone, ...respone.listItem];
  //       paging.skipCount = skipCount + maxResultCount;

  //       if(paging.skipCount >= respone.totalCount){
  //         this.isFullItem = true;
  //       }
  //     }
  //   )
  // }

  getPostByTime(paging : PagingModel, startdatepickerValue: string,enddatepickerValue: string ){
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

  loadMore(){
    this.getPostByTime(this.paging,this.startdatepickerValue,this.enddatepickerValue);
  }

  initDate() {
    let today = new Date();
    this.month = today.getMonth();
    this.year = today.getFullYear();
    this.startdatepickerValue = new Date(this.year, this.month -1, today.getDate()).toDateString();
    this.enddatepickerValue = new Date(this.year, this.month, today.getDate()).toDateString();

  }

  isToday(date: number) {
    const today = new Date();
    const d = new Date(this.year, this.month, date);
    return today.toDateString() === d.toDateString() ? true : false;
  }

  getStartDateValue(date: number) {
    let selectedStartDate = new Date(this.year, this.monthStartDate, date);
    this.startdatepickerValue = selectedStartDate.toDateString();
    this.showStartDatepicker = false;
  }

  getEndDateValue(date: number) {
    let selectedEndDate = new Date(this.year, this.monthEndDate, date);
    this.enddatepickerValue = selectedEndDate.toDateString();
    this.showEndDatepicker = false;
  }



  getNoOfDays() {
    const daysInMonth = new Date(this.year, this.month + 1, 0).getDate();

    // find where to start calendar day of week
    let dayOfWeek = new Date(this.year, this.month).getDay();
    let blankdaysArray = [];
    for (var i = 1; i <= dayOfWeek; i++) {
      blankdaysArray.push(i);
    }

    let daysArray = [];
    for (var i = 1; i <= daysInMonth; i++) {
      daysArray.push(i);
    }

    this.blankdays = blankdaysArray;
    this.no_of_days = daysArray;
  }
  ngOnInit(): void {
    this.initDate();
    this.getNoOfDays();
    this.getPostByTime(this.paging,this.startdatepickerValue,this.enddatepickerValue);
  }


  trackByIdentity = (index: number, item: any) => item;
}
