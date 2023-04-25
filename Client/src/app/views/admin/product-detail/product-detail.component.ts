import { ShareDataService } from 'src/app/_service/share-data.service';
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AlertService } from "src/app/_service/alert.service";
import { PostService } from "src/app/_service/post.service";
import { PostModel } from "src/app/models/post-model";

@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
})
export class ProductDetailComponent implements OnInit {

  postItem: PostModel = new PostModel()
  postId: number = 0;

  selectedDistrict: string ='';
  selectedWards: string ='';
  selectedStreet: string ='';
  selectedAddress: string ='';

  constructor(private shareDataService: ShareDataService ,private route: ActivatedRoute, private postService:PostService) {}


  onDropdownChange() {

    this.selectedAddress = `${this.selectedDistrict}, ${this.selectedWards}, ${this.selectedStreet}`;
  }

  ngOnInit() {
    this.postId = this.route.snapshot.params['postId'];
    this.shareDataService.setPositionPost([]);
    this.postService.getPostById(this.postId)
    .subscribe(
      respone => {
        this.postItem = respone;
        this.shareDataService.setPositionPost(respone.property.positions);
        this.shareDataService.setImageSlideValue(this.postItem.images.map(x => x.linkImage));

      },
      error =>{
        AlertService.setAlertModel('danger','Some thing went wrong')
      }
    )
  }
}
