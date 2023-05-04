import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertService } from "src/app/_service/alert.service";
import { AuthService } from "src/app/_service/auth.service";
import { UserInfor } from "src/app/_service/user.model";
import { VipService } from "src/app/_service/vip.service";
import { Clipboard } from '@angular/cdk/clipboard';
import { PostService } from "src/app/_service/post.service";
import { PostModel } from "src/app/models/post-model";
import { PROPERTY_INFOR } from "src/assets/common/propertyInfor";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]

})
export class ProfileComponent implements OnInit {
  status:number = PROPERTY_INFOR.isUpdate;
  postUserId: number = 0;
  userPosts: PostModel[] = [];
  userInfor: UserInfor = new UserInfor();
  constructor(private route: ActivatedRoute, private postService: PostService, private auth: AuthService,private http:HttpClient, private router: Router,private vipService :VipService, private clipboard :Clipboard) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.params['userId'];
    this.postUserId = userId;
    const user = this.auth.getUserProfile();
    if((user == null || user!.nameid !== userId) && user?.role != PROPERTY_INFOR.Role.admin){
      this.getApprovedPostByUserId(userId);
    }
    else{
      this.getPostByUserId(userId);
    }

    this.getUserInforById(userId)


  }

  getUserInforById(userId: number){
    this.auth.getUserInforById(userId)
    .subscribe(
      respone => {
        this.userInfor = respone;
      },
      erorr =>{
        AlertService.setAlertModel('danger','Some thing went wrong while loading user information!');
      }
    )
  }

  getApprovedPostByUserId(userId: number){
    this.postService.getApprovedPostByUserId(userId)
    .subscribe(
      respone => {
        this.userPosts = respone;
      },
      error => {
        AlertService.setAlertModel('danger', 'Some thing went wrong');
      }
    )
  }

  getPostByUserId(userId: number){
    this.postService.getPostsByUserId(userId)
    .subscribe(
      respone =>{
        this.userPosts = respone;
      },
      error => {
        AlertService.setAlertModel('danger', 'Some thing went wrong');
      }
    )
  }
  copyText(textToCopy: string) {
    this.clipboard.copy(textToCopy);
    }


}
