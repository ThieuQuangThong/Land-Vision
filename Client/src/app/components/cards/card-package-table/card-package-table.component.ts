import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { VipService } from 'src/app/_service/vip.service';
import { PagingModel } from 'src/app/models/paging-model';
import { VipModel } from 'src/app/models/vip-model';

@Component({
  selector: 'app-card-package-table',
  templateUrl: './card-package-table.component.html',
  styleUrls: ['./card-package-table.component.css']
})
export class CardPackageTableComponent implements OnInit {
  displayedPackagesColumns: string[] = ['#', 'name', 'price', 'postLimit','edit'];


  dataSourcePackage = new MatTableDataSource<any>();


  editorEnabled = false;

enableEditor() {
this.editorEnabled = true;
}

disableEditor() {
this.editorEnabled = false;
}

save() {
this.disableEditor();
}
@ViewChild('packagePaginator', { static: true }) packagePaginator!: MatPaginator;

@ViewChild('empTbSort') empTbSort = new MatSort();
@ViewChild('nameEdit') nameEdit!: ElementRef ;
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

  vipResponse: VipModel[] = [];


  constructor( private vipService :VipService, private router : Router) {
    const now = new Date();


  }

  ngOnInit(): void {
    this.getAll(this.paging);
  }
  ngAfterViewInit() {
    this.dataSourcePackage.sort = this.empTbSort;

}
  applyDateFilter()  {
      this.dataSourcePackage.filterPredicate = (data, filter) =>{
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
    this.dataSourcePackage.filter = ''+Math.random();
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

    this.vipService.getAllVip()
    .subscribe(
      respone =>{
        this.vipResponse = respone;
        this.dataSourcePackage = new MatTableDataSource(this.vipResponse);
        this.dataSourcePackage.sort = this.sort;
        this.dataSourcePackage.paginator = this.packagePaginator;
      }
    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourcePackage.filter = filterValue.trim().toLowerCase();

    if (this.dataSourcePackage.paginator) {
      this.dataSourcePackage.paginator.firstPage();
    }
  }

}
