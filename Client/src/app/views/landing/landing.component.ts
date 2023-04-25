import { Component, OnInit } from "@angular/core";
import { PostService } from "src/app/_service/post.service";
import { PagingModel } from "src/app/models/paging-model";
import { PostModel } from "src/app/models/post-model";
import { SearchModel } from "src/app/models/search-model";
import { PROPERTY_INFOR } from "src/assets/common/propertyInfor";

@Component({
  selector: "app-landing",
  templateUrl: "./landing.component.html",
  styleUrls: ['./landing.component.css']


})
export class LandingComponent implements OnInit {

  isLoading: boolean = false;

  mainSearch: SearchModel = new SearchModel();
  text: string = "";

  transactionTypes: string[] = [ ...PROPERTY_INFOR.all, ...PROPERTY_INFOR.TransactionTypes];
  selectedTransactionTypes: number = 0;

  interiors: string[] = [ ...PROPERTY_INFOR.all, ...PROPERTY_INFOR.Interior];
  selectedInterior: number = 0;

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

  defaultPaging: PagingModel = {
    skipCount : 0,
    maxResultCount : 8,
  }

  paging: PagingModel = JSON.parse(JSON.stringify(this.defaultPaging));

  isFullItem: boolean = false;
  postRespone: PostModel[] = [];

  paddingTop: string = '';
  constructor(private postService:PostService) {
  }

  ngOnInit(): void {
    this.getPost(this.paging);
  }
  receiveHeight($event: any){
    console.log($event);

  this.paddingTop = $event.toString()+"px";
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
      interiorStatus: this.selectedInterior,
      price: this.selectedPrice,
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
