import { Component, OnInit } from "@angular/core";
import { PostService } from "src/app/_service/post.service";
import { PagingModel } from "src/app/models/paging-model";
import { PostResponeModel } from "src/app/models/post-respone-model";

@Component({
  selector: "app-landing",
  templateUrl: "./landing.component.html",


})
export class LandingComponent implements OnInit {
  paging: PagingModel = new PagingModel();
  postRespone: PostResponeModel = new PostResponeModel();
  constructor(private postService:PostService) {

  }

  ngOnInit(): void {
    this.paging = {
      skipCount : 0,
      maxResultCount : 12,
    }
    this.postService.getAllPost(this.paging)
    .subscribe(
      respone =>{
        this.postRespone = respone;
      }
    )
  }

}
