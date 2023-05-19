import { Component, OnInit } from "@angular/core";
import { EChartsOption } from 'echarts';
import { ChartService } from "src/app/_service/chart.service";
import { DetailPurchaseQuantityByType, PostQuantityByType, QuantityByTime } from "src/app/models/chart-model";


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

  accountKeys : any[] = [];
  postKeys : any[] = [];
  revenueKeys : any [] = [];

  ngOnInit(): void {
    this.getPostByDateTime('day');
    this.getAccountByDateTime('day');
    this.getRevenueByDateTime('day');
    this.getByPostByType();
    this.getDetailPurchaseByType();
  }

  getByPostByType() : void {
    this.chartService.getPostByTransType().subscribe(
      response => {
        this.dataPostByType =response
        this.chartPostPieOptions = {
          title: {
            text: 'Type of post',
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
              type: 'pie',
              radius: '50%',
              label: {
                formatter: '({d}%)'
              },
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

        this.chartRevenuePieOptions = {
          title: {
            text: 'Type of package',
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
              name: 'Package type',
              type: 'pie',
              radius: '50%',
              label: {
                formatter: '({d}%)'
              },
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

  getPostByDateTime(options : string) :void{
      this.chartService.getPostByTime().subscribe(response =>{
      this.postByTime = response;

      if(options == 'day'){

        this.postKeys = Object.keys(this.postByTime.numbByDays || {});
        this.postKeys.sort();
        this.dataPost = this.postKeys.map( key => {
          const monthValue = this.postByTime.numbByDays ? this.postByTime.numbByDays[key] : null;
          return monthValue;
        })

      } else if( options == 'month'){

        this.postKeys = Object.keys(this.postByTime.numbByMonths || {});
        this.postKeys.sort();
        this.dataPost = this.postKeys.map( key => {
          const monthValue = this.postByTime.numbByMonths ? this.postByTime.numbByMonths[key] : null;
          return monthValue;
        })

      } else if ( options == 'year'){

        this.postKeys = Object.keys(this.postByTime.numbByYears || {});
        this.postKeys.sort();
        this.dataPost = this.postKeys.map( key => {
          const monthValue = this.postByTime.numbByYears ? this.postByTime.numbByYears[key] : null;
          return monthValue;

      })
      }

      this.chartPostOptions = {
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: this.postKeys,
          boundaryGap: false,

        },
        yAxis: {
          name: 'Number of posts',
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
    }
    )
  }
  getAccountByDateTime(options : string) :void{
      this.chartService.getAccountByTime().subscribe(response  =>{
      this.accountByTime = response;

      if(options == 'day'){
        this.accountKeys = Object.keys(this.accountByTime.numbByDays || {});
        this.accountKeys.sort();
        this.dataAccount = this.accountKeys.map( key => {
          const monthValue = this.accountByTime.numbByDays ? this.accountByTime.numbByDays[key] : null;
          return monthValue;
        })

      } else if( options == 'month'){
        this.accountKeys = Object.keys(this.accountByTime.numbByMonths || {});
        this.accountKeys.sort();
        this.dataAccount = this.accountKeys.map( key => {
          const monthValue = this.accountByTime.numbByMonths ? this.accountByTime.numbByMonths[key] : null;
          return monthValue;
        })

      } else if ( options == 'year'){
        this.accountKeys = Object.keys(this.accountByTime.numbByYears || {});
        this.accountKeys.sort();
        this.dataAccount = this.accountKeys.map( key => {
          const monthValue = this.accountByTime.numbByYears ? this.accountByTime.numbByYears[key] : null;
          return monthValue;
        })

      }



      this.chartAccountOptions = {

        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data:this.accountKeys,
        },
        yAxis: {
          name: 'Number of accounts',
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
    }
    )
  }
  getRevenueByDateTime(options : string) :void{
      this.chartService.getRevenueByTime().subscribe(response =>{
      this.revenueByTime = response;

      if(options == 'day'){

        this.revenueKeys = Object.keys(this.revenueByTime.numbByDays || {});
        this.revenueKeys.sort();
        this.dataRevenue = this.revenueKeys.map( key => {
        const monthValue = this.revenueByTime.numbByDays ? this.revenueByTime.numbByDays[key] : null;
        return monthValue;
      })
      } else if( options == 'month'){

        this.revenueKeys = Object.keys(this.revenueByTime.numbByMonths || {});
        this.revenueKeys.sort();
        this.dataRevenue = this.revenueKeys.map( key => {
        const monthValue = this.revenueByTime.numbByMonths ? this.revenueByTime.numbByMonths[key] : null;
        return monthValue;
      })
      } else if ( options == 'year'){
        this.revenueKeys = Object.keys(this.revenueByTime.numbByYears || {});
        this.revenueKeys.sort();
        this.dataRevenue = this.revenueKeys.map( key => {
        const monthValue = this.revenueByTime.numbByYears ? this.revenueByTime.numbByYears[key] : null;
        return monthValue;
      })
      }
      this.chartRevenueOptions = {
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: this.revenueKeys,
          boundaryGap: false,
        },
        yAxis: {
          name: 'VND',
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
