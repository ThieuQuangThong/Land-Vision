import { Component, OnInit } from "@angular/core";
import { PostService } from "src/app/_service/post.service";
import { PagingModel } from "src/app/models/paging-model";
import { PostModel } from "src/app/models/post-model";

@Component({
  selector: "app-landing",
  templateUrl: "./landing.component.html",
  styleUrls: ['./landing.component.css']


})
export class LandingComponent implements OnInit {
  paging: PagingModel = {
    skipCount : 0,
    maxResultCount : 8,
  }
  isFullItem: boolean = false;
  postRespone: PostModel[] = [];
  constructor(private postService:PostService) {
  }

  ngOnInit(): void {
    this.getPost(this.paging);
  }

  getPost(paging: PagingModel){
    this.postService.getAllPost(paging)
    .subscribe(
      respone =>{
        var {skipCount, maxResultCount} = respone.pagination;

        this.postRespone = [...this.postRespone, ...respone.listItem];
        paging.skipCount = skipCount + maxResultCount;

        if(paging.skipCount >= respone.totalCount){
          this.isFullItem = true;
        }
      }
    )
  }

  loadMore(){
    this.getPost(this.paging);
  }

}
