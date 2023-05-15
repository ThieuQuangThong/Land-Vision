import { CategoryService } from './../../_service/category.service';
import { Router } from '@angular/router';
import { Component, OnInit } from "@angular/core";
import { PostService } from "src/app/_service/post.service";
import { CategoryModel } from "src/app/models/category-model";
import { PagingModel } from "src/app/models/paging-model";
import { PostModel } from "src/app/models/post-model";
import { SearchModel } from "src/app/models/search-model";
import { PROPERTY_INFOR } from "src/assets/common/propertyInfor";
import {ToastrService} from 'ngx-toastr'
import { AuthService } from 'src/app/_service/auth.service';

@Component({
  selector: "app-landing",
  templateUrl: "./landing.component.html",
  styleUrls: ['./landing.component.css']


})
export class LandingComponent implements OnInit {

  status: number = PROPERTY_INFOR.isToView;
  isLoading: boolean = false;

  mainSearch: SearchModel = new SearchModel();
  text: string = "";

  transactionTypes: string[] = [ ...PROPERTY_INFOR.allTransaction, ...PROPERTY_INFOR.TransactionTypes];
  selectedTransactionTypes: number = 0;

  categories: CategoryModel[] = [];
  selectedcategoryId: number = -1;

  prices: string[] = [...PROPERTY_INFOR.allPrice, ...PROPERTY_INFOR.prices]
  selectedPrice: number = 0;

  floors: string[] = [...PROPERTY_INFOR.allFloor, ...PROPERTY_INFOR.floors]
  selectedFloor: number = 0;

  bedRooms: string[] = [...PROPERTY_INFOR.allBedroom, ...PROPERTY_INFOR.bedRooms]
  selectedBedroom: number = 0;

  bathRooms: string[] = [...PROPERTY_INFOR.allBathroom, ...PROPERTY_INFOR.bathRoom]
  selectedBathroom: number = 0;

  directions: string[] =[...PROPERTY_INFOR.allDirection, ...PROPERTY_INFOR.directions]
  selectedDirection: number = 0;

  openTab = 1;
  toggleTabs($tabNumber: number){
    this.openTab = $tabNumber;
  }

  defaultPaging: PagingModel = {
    skipCount : 0,
    maxResultCount : PROPERTY_INFOR.maxResultCount,
  }

  paging: PagingModel = JSON.parse(JSON.stringify(this.defaultPaging));

  isFullItem: boolean = false;
  postRespone: PostModel[] = [];

  paddingTop: string = '';
  constructor(
    private router: Router,
    public toastr: ToastrService,
    private postService:PostService,
    private categoryService: CategoryService,
    private auth: AuthService) {
  }

  ngOnInit(): void {
    const userId = this.auth.getUserId();
    if(userId){
      this.auth.getUserInforById(userId)
      .subscribe(
        respone =>{
          if(respone.numberOfNotification > 0 ){
            this.showChangingStatusNotfication(respone.numberOfNotification)
          }
        }
      );
    }

    this.getCategorys();
    this.getPost(this.paging);
  }

  showChangingStatusNotfication(numberOfNotification: number){
    const userId = this.auth.getUserId();
    this.toastr.warning(`You have ${numberOfNotification} changing in your posts from Admin`, 'Information:', {
      timeOut: 3000,
    }).onTap.subscribe(() => {
      this.router.navigateByUrl('/profile/'+userId);
    });
  }

  receiveHeight($event: any){
    console.log($event);

  this.paddingTop = $event.toString()+"px";
  }


  getCategorys(){
    this.categoryService.getCategory()
    .subscribe(
      respone =>{
        const AllCategoryOption:CategoryModel ={
          id: -1,
          name: PROPERTY_INFOR.allCategory
        }
        this.categories.push(AllCategoryOption)
        this.categories.push(...respone);

      }
    )
  }

  getPost(paging: PagingModel){
    this.isLoading = true;
    this.postService.getSearchedPost(paging,this.mainSearch)
    .subscribe(
      respone =>{
        this.isLoading = false
        var {skipCount, maxResultCount} = respone.pagination;

        this.postRespone = [...this.postRespone, ...respone.listItem];
        paging.skipCount = skipCount + maxResultCount;

        if(paging.skipCount >= respone.totalCount){
          this.isFullItem = true;
        }
        else{
          this.isFullItem = false;
        }
      },
      error => {
        this.isLoading = false
      }
    )
  }

  search(){
    const searchObject: SearchModel = {
      text: this.text,
      transactionType: this.selectedTransactionTypes,
      categoryId: this.selectedcategoryId,
      price: Number(PROPERTY_INFOR.priceValues[this.selectedPrice]),
      numberOfBed: this.selectedBedroom,
      numberOfFloor: this.selectedFloor,
      numberOfBath: this.selectedBathroom,
      direction: this.selectedDirection,
    }

    this.mainSearch = searchObject;
    this.postRespone = [];
    this.paging = JSON.parse(JSON.stringify(this.defaultPaging));
    this.getPost(this.paging);
  }

  loadMore(){
    this.getPost(this.paging);
  }

}
