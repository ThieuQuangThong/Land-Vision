import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AlertService } from "src/app/_service/alert.service";
import { AuthService } from "src/app/_service/auth.service";
import { UserInfor } from "src/app/_service/user.model";
import { VipService } from "src/app/_service/vip.service";
import { VipModel } from "src/app/models/vip-model";
import { VipResponeModel } from "src/app/models/vip-response-model";
import { Clipboard } from '@angular/cdk/clipboard';
import { PostResponeModel } from "src/app/models/post-respone-model";
import { PostService } from "src/app/_service/post.service";
import { PostModel } from "src/app/models/post-model";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]

})
export class ProfileComponent implements OnInit {
  userPosts: PostModel[] = [];
  vipResponse: VipModel[] = [];
  userInfor: UserInfor = new UserInfor();
  constructor(private postService: PostService, private auth: AuthService,private http:HttpClient, private router: Router,private vipService :VipService, private clipboard :Clipboard) {}

  ngOnInit(): void {
    const userId = this.auth.getUserId();
    this.postService.getPostsByUserId(userId)
    .subscribe(
      respone =>{
        this.userPosts = respone;
      },
      error => {
        AlertService.setAlertModel('danger', 'Some thing went wrong');
      }
    )
    this.auth.getUserInforById(userId)
    .subscribe(
      respone => {
        this.userInfor = respone;
      },
      erorr =>{
        AlertService.setAlertModel('danger','Some thing went wrong while loading user information!');
      }
    )
      this.vipService.getAllVip().subscribe(
        response => {
          this.vipResponse = response;
        }
      );


  }
  copyText(textToCopy: string) {
    this.clipboard.copy(textToCopy);
    }


}
