import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserService } from 'src/app/_service/user.service';
import { PagingModel } from 'src/app/models/paging-model';
import { UserModel } from 'src/app/models/user-model';
import { CardAccountDetailComponent } from '../card-account-detail/card-account-detail.component';

@Component({
  selector: 'app-card-account-table',
  templateUrl: './card-account-table.component.html',
  styleUrls: ['./card-account-table.component.css']
})
export class CardAccountTableComponent implements OnInit {
  displayedSellersColumns: string[] = ['#', 'name', 'email', 'phone', 'isHide'];


  dataSourceSeller = new MatTableDataSource<any>();


@ViewChild('sellerPaginator', { static: true }) sellerPaginator!: MatPaginator;

@ViewChild('empTbSort') empTbSort = new MatSort();

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @Input()
  get color(): string {
    return this._color;
  }
  set color(color: string) {
    this._color = color !== "light" && color !== "dark" ? "light" : color;
  }
  private _color = "light";
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

  userRespone: UserModel[] = [];


  constructor(public dialog: MatDialog, private userService : UserService, private router : Router) {
    const now = new Date();


  }
  openProfileDialog(id:number, enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(CardAccountDetailComponent, {
      data : {id},
      width: '1000px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
  ngOnInit(): void {
    this.getAll(this.paging);
  }
  ngAfterViewInit() {
    this.dataSourceSeller.sort = this.empTbSort;

}
  applyDateFilter()  {
      this.dataSourceSeller.filterPredicate = (data, filter) =>{
        const day = new Date(data.createDate).getDate(); // Lấy ngày trong tháng (1-31)
        const year = new Date(data.createDate).getFullYear(); // Lấy năm (4 chữ số)
        const month = new Date(data.createDate).getMonth() + 1; // Lấy tháng (0-11) và cộng thêm 1 để đưa về dạng 1-12
          const createDate = new Date(year, month - 1, day);
        if (this.fromDate && this.toDate) {
          return createDate >= this.fromDate && createDate <= this.toDate;
        }
        return true;
      }
    this.dataSourceSeller.filter = ''+Math.random();
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
    this.dataSourceSeller.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceSeller.paginator) {
      this.dataSourceSeller.paginator.firstPage();
    }
  }

}
