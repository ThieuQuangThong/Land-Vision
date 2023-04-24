import { Component, OnInit } from "@angular/core";
import { AlertService } from "src/app/_service/alert.service";
import { AuthService } from "src/app/_service/auth.service";
import { UserInfor } from "src/app/_service/user.model";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]

})
export class ProfileComponent implements OnInit {

  userInfor: UserInfor = new UserInfor();
  constructor(private auth: AuthService) {}

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
  }
}
