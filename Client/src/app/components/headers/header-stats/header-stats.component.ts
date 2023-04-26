import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { DetailPurchaseService } from "src/app/_service/detail-purchase.service";
import { PostService } from "src/app/_service/post.service";
import { UserService } from "src/app/_service/user.service";
import { PagingModel } from "src/app/models/paging-model";

@Component({
  selector: "app-header-stats",
  templateUrl: "./header-stats.component.html",
})
export class HeaderStatsComponent implements OnInit {
  constructor( public translate: TranslateService,private postService:PostService, private userService : UserService, private detailPurchaseService : DetailPurchaseService) {}
  postCount : number = 0;
  userCount : number = 0;
  revenue : number = 0;
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

  }
  translateLanguageTo(lang: string) {

    this.translate.use(lang);
  }

}
