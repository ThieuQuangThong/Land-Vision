import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/_service/auth.service";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
})
export class SidebarComponent implements OnInit {
  collapseShow = "hidden";
  constructor(private auth: AuthService) {}

  ngOnInit() {}
  toggleCollapseShow(classes:any) {
    this.collapseShow = classes;
  }
  logout(){
    this.auth.logout();
  }
}
