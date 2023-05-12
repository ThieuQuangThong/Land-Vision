import { Component, OnInit, AfterViewInit } from "@angular/core";
import { EChartsOption } from 'echarts';
import { ChartService } from "src/app/_service/chart.service";
import { PostQuantityByType, QuantityByTime, DetailPurchaseQuantityByType } from "src/app/models/chart-model";
import {forkJoin} from "rxjs";


@Component({
  selector: "app-card-line-chart",
  templateUrl: "./card-line-chart.component.html",
})
export class CardLineChartComponent implements OnInit {
  public chart: any;
  accountByTime : QuantityByTime = new QuantityByTime();
  postByTime : QuantityByTime = new QuantityByTime();
  revenueByTime : QuantityByTime = new QuantityByTime();
  postCountByType : PostQuantityByType = new PostQuantityByType();
  detailPurchaseByVipType : DetailPurchaseQuantityByType = new DetailPurchaseQuantityByType();
  dataAccount: any[] = [];
  dataPost : any[] = [];
  dataRevenue : any[] = [];
  dataPostByType : any[] =[];
  dataDetailPurchaseByVipType : any[]=[];
  chartAccountOptions: EChartsOption ={};
  chartPostOptions: EChartsOption ={};
  chartPostPieOptions : EChartsOption = {};
  chartRevenueOptions: EChartsOption ={};
  chartRevenuePieOptions : EChartsOption = {};
  constructor(private chartService : ChartService) {}

  ngOnInit(): void {
    this.getByTime();
    this.getByPostByType();
    this.getDetailPurchaseByType();
  }

  getByPostByType() : void {
    this.chartService.getPostByTransType().subscribe(
      response => {
        this.dataPostByType =response
        this.chartPostPieOptions = {
          title: {
            text: 'Referer of a Website',
            subtext: 'Fake Data',
            left: 'center'
          },
          tooltip: {
            trigger: 'item'
          },
          legend: {
            orient: 'vertical',
            left: 'left'
          },
          series: [
            {
              name: 'Access From',
              type: 'pie',
              radius: '50%',
              data: this.dataPostByType,
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };

      }
    )

  }
  getDetailPurchaseByType() : void {
    this.chartService.getDetailPurchaseByVipType().subscribe(
      response => {
        this.dataDetailPurchaseByVipType =response;
        console.log(this.dataDetailPurchaseByVipType);

        this.chartRevenuePieOptions = {
          title: {
            text: 'Type of package',
            subtext: 'Fake Data',
            left: 'center'
          },
          tooltip: {
            trigger: 'item'
          },
          legend: {
            orient: 'vertical',
            left: 'left'
          },
          series: [
            {
              name: 'Access From',
              type: 'pie',
              radius: '50%',
              data: this.dataDetailPurchaseByVipType,
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };

      }
    )

  }
  getByTime() :void{
    forkJoin([
      this.chartService.getAccountByTime(),
      this.chartService.getPostByTime(),
      this.chartService.getRevenueByTime(),
    ]).subscribe(([accountData, postData,revenueData]) =>{
      this.accountByTime = accountData;
      this.postByTime = postData;
      this.revenueByTime = revenueData;


      console.log(this.postCountByType);
      for (let i = 1; i <= 12 ; i++) {
        let checkDataAccount: number[] = []
        let checkDataPost: number[] = []
        let checkDataRevenue: number[] = []

        //add data Account
        Object.keys(this.accountByTime.numbByMonths!).map(key => {
          let m = key.split("-")[1]
          if (i.toString() == m) {
            checkDataAccount.push(this.accountByTime.numbByMonths![key])
            return
          }
          checkDataAccount.push(0)
        })
        let nonZeroAccountElement = checkDataAccount.find(element => element !== 0);
        if (nonZeroAccountElement) {
          this.dataAccount.push(nonZeroAccountElement)
        }
        else {
          this.dataAccount.push(0)
        }
        //add data Post
        Object.keys(this.postByTime.numbByMonths!).map(key => {
          let m = key.split("-")[1]
          if (i.toString() == m) {
            checkDataPost.push(this.postByTime.numbByMonths![key])
            return
          }
          checkDataPost.push(0)
        })
        let nonZeroPostElement = checkDataPost.find(element => element !== 0);
        if (nonZeroPostElement) {
          this.dataPost.push(nonZeroPostElement)
        }
        else {
          this.dataPost.push(0)
        }
        //add data Revenue
        Object.keys(this.revenueByTime.numbByMonths!).map(key => {
          let m = key.split("-")[1]
          if (i.toString() == m) {
            checkDataRevenue.push(this.revenueByTime.numbByMonths![key])
            return
          }
          checkDataRevenue.push(0)
        })
        let nonZeroRevenueElement = checkDataRevenue.find(element => element !== 0);
        if (nonZeroRevenueElement) {
          this.dataRevenue.push(nonZeroRevenueElement)
        }
        else {
          this.dataRevenue.push(0)
        }
      }
      this.chartAccountOptions = {
        xAxis: {
          type: 'category',
          data: [
                  'Jan',
                  'Feb',
                  'Mar',
                  'Apr',
                  'May',
                  'Jun',
                  'Jul',
                  'Aug',
                  'Sep',
                  'Oct',
                  'Nov',
                  'Dec'],
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            name: "Account",
              type: "line",
              color: '#3b82f6',
            data : this.dataAccount
          },
        ]
      }
      this.chartPostOptions = {
        xAxis: {
          type: 'category',
          data: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'],
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            name: "Post",
              type: "line",
              color: '#ef4444',
            data : this.dataPost
          },
        ]
      }
      this.chartRevenueOptions = {
        xAxis: {
          type: 'category',
          data: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'],
        },
        yAxis: {
          type: 'value',
        },
        series: [

          {
            name: "Revenue",
              type: "line",
              color: '#11b981',
            data : this.dataRevenue
          },
        ]
      }

    }
    )

  }
}
