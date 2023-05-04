import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/_service/alert.service';
import { AuthService } from 'src/app/_service/auth.service';
import { PostService } from "src/app/_service/post.service";
import { VipService } from 'src/app/_service/vip.service';
import { PagingModel } from "src/app/models/paging-model";
import { PostModel } from "src/app/models/post-model";
import { SearchModel } from "src/app/models/search-model";
import { VipModel } from 'src/app/models/vip-model';
import { PROPERTY_INFOR } from "src/assets/common/propertyInfor";

@Component({
  selector: 'app-pricing-dialog',
  templateUrl: './pricing-dialog.component.html',
  styleUrls: ['./pricing-dialog.component.css']
})
export class PricingDialogComponent implements OnInit {
  vipResponse: VipModel[] = [];
  isLoading: boolean = false;

  mainSearch: SearchModel = new SearchModel();
  text: string = "";

  transactionTypes: string[] = [ ...PROPERTY_INFOR.allTransaction, ...PROPERTY_INFOR.TransactionTypes];
  selectedTransactionTypes: number = 0;


  isFullItem: boolean = false;
  postRespone: PostModel[] = [];

  paddingTop: string = '';
  constructor(private postService:PostService, private auth: AuthService,private http:HttpClient, private router: Router,private vipService :VipService) {
  }

  ngOnInit(): void {
    const userId = this.auth.getUserId();

      this.vipService.getAllVip().subscribe(
        response => {
          this.vipResponse = response;
        }
      );


  }


  receiveHeight($event: any){
    console.log($event);

  this.paddingTop = $event.toString()+"px";
  }





}
