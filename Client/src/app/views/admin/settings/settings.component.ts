import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AlertService } from "src/app/_service/alert.service";
import { PostService } from "src/app/_service/post.service";
import { PagingModel } from "src/app/models/paging-model";
import { PostModel } from "src/app/models/post-model";
import { PostResponeModel } from "src/app/models/post-respone-model";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
})
export class SettingsComponent implements OnInit {

  postItem: PostModel = new PostModel()
  postId: number = 0;

  selectedDistrict: string ='';
  selectedWards: string ='';
  selectedStreet: string ='';
  selectedAddress: string ='';

  constructor(private route: ActivatedRoute, private postService:PostService) {}


  onDropdownChange() {

    this.selectedAddress = `${this.selectedDistrict}, ${this.selectedWards}, ${this.selectedStreet}`;
  }

  ngOnInit() {
    this.postId = this.route.snapshot.params['postId'];
    this.postService.getPostById(this.postId)
    .subscribe(
      respone => {

        this.postItem = respone;
        console.log(this.postItem);
      },
      error =>{
        AlertService.setAlertModel('danger','Some thing went wrong')
      }
    )

  }

}
