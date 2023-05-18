import { ShareDataService } from 'src/app/_service/share-data.service';
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AlertService } from "src/app/_service/alert.service";
import { PostService } from "src/app/_service/post.service";
import { PostModel } from "src/app/models/post-model";
import { AuthService } from 'src/app/_service/auth.service';
import { Router } from '@angular/router';
import { PROPERTY_INFOR } from 'src/assets/common/propertyInfor';

@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  postTitle: string = '';
  postItem: PostModel = new PostModel()
  postId: number = 0;
  selectedDistrict: string ='';
  selectedWards: string ='';
  selectedStreet: string ='';
  selectedAddress: string ='';

  isReject: boolean = false;
  rejectReasonText: string ='';

  showHeader: boolean = true;

  constructor(private  shareDataService: ShareDataService,private route: ActivatedRoute, private postService:PostService, private auth: AuthService,private Router: Router,) {}


  onDropdownChange() {
    this.selectedAddress = `${this.selectedDistrict}, ${this.selectedWards}, ${this.selectedStreet}`;
  }

  ngOnInit() {
    const adminRoute = this.route.pathFromRoot.find(route => route.snapshot.routeConfig?.path === 'admin');
    if (adminRoute) {
      this.showHeader = false;
    }


    const encodeId = this.route.snapshot.params['postId'];
    this.postId = Number(this.auth.decode(encodeId))

    this.shareDataService.setPositionPost([]);
    this.postService.getPostById(this.postId)
    .subscribe(
      respone => {
        if(respone.approveStatus === PROPERTY_INFOR.isReject){
          this.isReject = true;
          this.rejectReasonText = respone.rejectReason;
        }
        this.postItem = respone;
        this.shareDataService.setPositionPost(respone.property.positions);
        this.shareDataService.setImageSlideValue(this.postItem.images.map(x => x.linkImage));

      },
      error =>{
        AlertService.setAlertModel('danger','Some thing went wrong')
      }
    )
  }
  MyProfile(){
    const idSeller = this.postItem.user.id.toString()
    this.Router.navigateByUrl('/profile/'+idSeller)
  }
  zaloDirect(){
    this.Router.navigateByUrl('https://zalo.me/0794217184')
  }
}
