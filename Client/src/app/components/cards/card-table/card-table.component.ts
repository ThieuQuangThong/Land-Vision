import { Component, OnInit, Input } from "@angular/core";
import { post } from "dojo/request";
import { PostService } from "src/app/_service/post.service";
import { PagingModel } from "src/app/models/paging-model";
import { PostModel } from "src/app/models/post-model";

@Component({
  selector: "app-card-table",
  templateUrl: "./card-table.component.html",
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

  month!: number; // !: mean promis it will not be null, and it will definitely be assigned
  year!: number;
  no_of_days = [] as number[];
  blankdays = [] as number[];

  constructor(private postService : PostService) {}

  ngOnInit(): void {
    this.initDate();
    this.getNoOfDays();
    this.getPost(this.paging);
  }

  getPost(paging: PagingModel){
    this.postService.getAllPost(paging)
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
    this.getPost(this.paging);
  }

  initDate() {
    let today = new Date();
    this.month = today.getMonth();
    this.year = today.getFullYear();
    this.startdatepickerValue = new Date(this.year, this.month, today.getDate()).toDateString();
    this.enddatepickerValue = new Date(this.year, this.month, today.getDate()).toDateString();

  }

  isToday(date: any) {
    const today = new Date();
    const d = new Date(this.year, this.month, date);
    return today.toDateString() === d.toDateString() ? true : false;
  }

  getStartDateValue(date: any) {
    let selectedDate = new Date(this.year, this.month, date);
    this.startdatepickerValue = selectedDate.toDateString();
    this.showStartDatepicker = false;
  }

  getEndDateValue(date: any) {
    let selectedDate = new Date(this.year, this.month, date);
    this.enddatepickerValue = selectedDate.toDateString();
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

  trackByIdentity = (index: number, item: any) => item;
}
