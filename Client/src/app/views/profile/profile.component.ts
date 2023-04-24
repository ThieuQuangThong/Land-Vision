import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AlertService } from "src/app/_service/alert.service";
import { AuthService } from "src/app/_service/auth.service";
import { UserInfor } from "src/app/_service/user.model";
import { VipService } from "src/app/_service/vip.service";
import { VipModel } from "src/app/models/vip-model";
import { VipResponeModel } from "src/app/models/vip-response-model";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]

})
export class ProfileComponent implements OnInit {
  vipResponse: VipModel[] = [];
  userInfor: UserInfor = new UserInfor();
  constructor(private auth: AuthService,private http:HttpClient, private router: Router,private vipService :VipService) {}

  ngOnInit(): void {
    const userId = this.auth.getUserId();
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
}
