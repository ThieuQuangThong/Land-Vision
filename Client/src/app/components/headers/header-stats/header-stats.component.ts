import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { ChartService } from "src/app/_service/chart.service";
import { DetailPurchaseService } from "src/app/_service/detail-purchase.service";
import { PostService } from "src/app/_service/post.service";
import { UserService } from "src/app/_service/user.service";
import { QuantityByTime } from "src/app/models/chart-model";

@Component({
  selector: "app-header-stats",
  templateUrl: "./header-stats.component.html",
})
export class HeaderStatsComponent implements OnInit {
  constructor( public chartService : ChartService,public translate: TranslateService,private postService:PostService, private userService : UserService, private detailPurchaseService : DetailPurchaseService) {}
  postCount : number = 0;
  userCount : number = 0;
  revenue : number = 0;
  accountByTime : QuantityByTime = new QuantityByTime();
  postByTime : QuantityByTime = new QuantityByTime();
  revenueByTime : QuantityByTime = new QuantityByTime();
  postGrowthValue : any
  postStatus : string = ""
  postColor : string = ""
  accountGrowthValue : any
  accountStatus : string = ""
  accountColor : string = ""
  revenueGrowthValue : any
  revenueStatus : string = ""
  revenueColor : string = ""
  ngOnInit(): void {

    this.postService.getPostCount().subscribe(
      response =>{
        this.postCount = response;
      });
    this.userService.getUserCount().subscribe(
      response =>{
        this.userCount = response;
      }
    );
    this.detailPurchaseService.getRevenue().subscribe(
      response =>{
        this.revenue = response;
      }
    )
    this.chartService.getPostByTime().subscribe(
      response =>{
        this.postByTime = response;
        const postKeys = Object.keys(this.postByTime.numbByMonths || {});
        postKeys.sort();
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;
        const currentMonthKey = `${currentYear}-${currentMonth}`;

        const currentValueOfCurrentMonth = postKeys.map( key => {
          const monthValue = this.postByTime.numbByMonths ? this.postByTime.numbByMonths[currentMonthKey] : null;
          return monthValue;
        })

        // console.log(`Giá trị của tháng ${currentMonth} là ${currentValueOfCurrentMonth[0]}`);

        // Lấy giá trị tháng trước
        const previousMonth = currentMonth - 1;
        const previousMonthKey =
          previousMonth === 0 ? `${currentYear - 1}-12` : `${currentYear}-${previousMonth}`;

        const currentValueOfPreviousMonth = postKeys.flatMap( key => {
          const monthValue = this.postByTime.numbByMonths ? this.postByTime.numbByMonths[previousMonthKey] : null;
          return monthValue;
        })

        // console.log(`Giá trị của tháng trước ${previousMonth} là ${currentValueOfPreviousMonth[0]}`);
        this.postGrowthValue =  ((currentValueOfCurrentMonth[0]!- currentValueOfPreviousMonth[0]!) / currentValueOfPreviousMonth[0]!) * 100;
        if(this.postGrowthValue > 0){
          this.postStatus = "up"
          this.postColor = "text-green-500"
        }else if(this.postGrowthValue < 0) {
          this.postStatus = "down"
          this.postColor = "text-red-500"
        }

      }
    )


    this.chartService.getAccountByTime().subscribe(
      response =>{
        this.accountByTime = response;
        const accountKeys = Object.keys(this.accountByTime.numbByMonths || {});
        accountKeys.sort();
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;
        const currentMonthKey = `${currentYear}-${currentMonth}`;

        const currentValueOfCurrentMonth = accountKeys.map( key => {
          const monthValue = this.accountByTime.numbByMonths ? this.accountByTime.numbByMonths[currentMonthKey] : null;
          return monthValue;
        })

        // console.log(`Giá trị của tháng ${currentMonth} là ${currentValueOfCurrentMonth[0]}`);

        // Lấy giá trị tháng trước
        const previousMonth = currentMonth - 1;
        const previousMonthKey =
          previousMonth === 0 ? `${currentYear - 1}-12` : `${currentYear}-${previousMonth}`;

        const currentValueOfPreviousMonth = accountKeys.flatMap( key => {
          const monthValue = this.accountByTime.numbByMonths ? this.accountByTime.numbByMonths[previousMonthKey] : null;
          return monthValue;
        })

        // console.log(`Giá trị của tháng trước ${previousMonth} là ${currentValueOfPreviousMonth[0]}`);
        this.accountGrowthValue =  ((currentValueOfCurrentMonth[0]!- currentValueOfPreviousMonth[0]!) / currentValueOfPreviousMonth[0]!) * 100;
        if(this.accountGrowthValue > 0){
          this.accountStatus = "up"
          this.accountColor = "text-green-500"
        }else if(this.accountGrowthValue < 0) {
          this.accountStatus = "down"
          this.accountColor = "text-red-500"
        }
        this.accountGrowthValue = this.accountGrowthValue.toFixed(2);

      }
    )


    this.chartService.getRevenueByTime().subscribe(
      response =>{
        this.revenueByTime = response;
        const revenueKeys = Object.keys(this.revenueByTime.numbByMonths || {});
        revenueKeys.sort();
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;
        const currentMonthKey = `${currentYear}-${currentMonth}`;

        const currentValueOfCurrentMonth = revenueKeys.map( key => {
          const monthValue = this.revenueByTime.numbByMonths ? this.revenueByTime.numbByMonths[currentMonthKey] : null;
          return monthValue;
        })

        // console.log(`Giá trị của tháng ${currentMonth} là ${currentValueOfCurrentMonth[0]}`);

        // Lấy giá trị tháng trước
        const previousMonth = currentMonth - 1;
        const previousMonthKey =
          previousMonth === 0 ? `${currentYear - 1}-12` : `${currentYear}-${previousMonth}`;

        const currentValueOfPreviousMonth = revenueKeys.flatMap( key => {
          const monthValue = this.revenueByTime.numbByMonths ? this.revenueByTime.numbByMonths[previousMonthKey] : null;
          return monthValue;
        })

        // console.log(`Giá trị của tháng trước ${previousMonth} là ${currentValueOfPreviousMonth[0]}`);
        this.revenueGrowthValue =  (((currentValueOfCurrentMonth[0]!- currentValueOfPreviousMonth[0]!) / currentValueOfPreviousMonth[0]!) * 100);
        if(this.revenueGrowthValue > 0){
          this.revenueStatus = "up"
          this.revenueColor = "text-green-500"
        }else if(this.revenueGrowthValue < 0) {
          this.revenueStatus = "down"
          this.revenueColor = "text-red-500"
        }
        this.revenueGrowthValue =  this.revenueGrowthValue.toFixed(2);

      }
    )
  }
  translateLanguageTo(lang: string) {

    this.translate.use(lang);
  }

}
