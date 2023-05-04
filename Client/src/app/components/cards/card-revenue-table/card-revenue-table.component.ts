import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DetailPurchaseService } from 'src/app/_service/detail-purchase.service';
import { DetailPurchaseModel } from 'src/app/models/detailPurchase-model';
import { PagingModel } from 'src/app/models/paging-model';

@Component({
  selector: 'app-card-revenue-table',
  templateUrl: './card-revenue-table.component.html',
  styleUrls: ['./card-revenue-table.component.css']
})
export class CardRevenueTableComponent implements OnInit {
  displayedRevenuesColumns: string[] = ['#', 'transactionDate', 'userId', 'vipName','vipPrice'];

  dataSourceRevenue = new MatTableDataSource<any>();

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

  goToDetail(id : number){
    this.router.navigate([`productdetails/${id}`])
  }

  detailPurchase: DetailPurchaseModel[] = [];

  @Input()
  get color(): string {
    return this._color;
  }
  set color(color: string) {
    this._color = color !== "light" && color !== "dark" ? "light" : color;
  }
  private _color = "light";

  constructor( private router : Router, private detailPurchaseService : DetailPurchaseService) {
    const now = new Date();


  }

  ngOnInit(): void {
    this.getAll(this.paging);
  }
  ngAfterViewInit() {
    this.dataSourceRevenue.sort = this.empTbSort;

}
  applyDateFilter()  {
      this.dataSourceRevenue.filterPredicate = (data, filter) =>{
        const day = new Date(data.transactionDate).getDate(); // Lấy ngày trong tháng (1-31)
        const year = new Date(data.transactionDate).getFullYear(); // Lấy năm (4 chữ số)
        const month = new Date(data.transactionDate).getMonth() + 1; // Lấy tháng (0-11) và cộng thêm 1 để đưa về dạng 1-12
          const createDate = new Date(year, month - 1, day);
          console.log(createDate+","+this.fromDate+','+this.toDate);
        if (this.fromDate && this.toDate) {
          return createDate >= this.fromDate && createDate <= this.toDate;
        }
        return true;
      }
    this.dataSourceRevenue.filter = ''+Math.random();
  };

  hideUnhide(postId : number){
    // this.postService.hideUnhidePost(postId)
    // .subscribe(
    //   _ =>{
    //     const test = this.postRespone.map(x => {
    //       if(x.id === postId){
    //         x.isHide = !x.isHide
    //       }
    //       return x;
    //     })
    //     this.postRespone = test;
    //     this.dataSourcePost = new MatTableDataSource(this.postRespone);

    //     this.dataSourcePost.sort = this.sort;
    //     this.dataSourcePost.paginator = this.postPaginator;
    //   }

    // );

  }


  getAll(paging: PagingModel) :void{

    this.detailPurchaseService.getDetailPurchase().subscribe(
      response =>{
      this.detailPurchase = response;
      console.log(this.detailPurchase);

        this.dataSourceRevenue = new MatTableDataSource(this.detailPurchase);
        this.dataSourceRevenue.sort = this.sort;
        this.dataSourceRevenue.paginator = this.revenuePaginator;
      }
    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceRevenue.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceRevenue.paginator) {
      this.dataSourceRevenue.paginator.firstPage();
    }
  }

}
