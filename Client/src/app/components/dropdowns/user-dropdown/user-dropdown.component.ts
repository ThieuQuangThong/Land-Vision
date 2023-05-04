import { Router } from '@angular/router';
import { Component, AfterViewInit, ViewChild, ElementRef } from "@angular/core";
import { createPopper } from "@popperjs/core";
import { AuthService } from "src/app/_service/auth.service";
import { StorageService } from "src/app/_service/storage.service";

@Component({
  selector: "app-user-dropdown",
  templateUrl: "./user-dropdown.component.html",
  styleUrls: ["./user-dropdown.component.css"],

})
export class UserDropdownComponent implements AfterViewInit {
  constructor(
    private Router: Router,
    private storageService: StorageService, private auth: AuthService){}
  dropdownPopoverShow = false;
  @ViewChild("btnDropdownRef", { static: false }) btnDropdownRef!: ElementRef;
  @ViewChild("popoverDropdownRef", { static: false })
  popoverDropdownRef!: ElementRef;
  avatarLink:string = "";

  ngAfterViewInit() {
    createPopper(
      this.btnDropdownRef.nativeElement,
      this.popoverDropdownRef.nativeElement,
      {
        placement: "bottom-start",
      }
    );
  }

  ngOnInit(): void {
  this.auth.getUserProfileAsTracking()
    .subscribe(
      respone => {
        this.auth.getUserInforById(respone?.nameid!)
        .subscribe(
          _ => {
            this.avatarLink = _.avatarLink;
          }
        )
      }
    );
  }

  toggleDropdown(event:any) {
    event.preventDefault();
    if (this.dropdownPopoverShow) {
      this.dropdownPopoverShow = false;
    } else {
      this.dropdownPopoverShow = true;
    }
  }
  isLoggedIn() {
    return this.auth.isLoggedIn();
  }
  getUser(){
    return this.auth.getUserId()
  }
  getLoggedInUser() {
    return this.auth.getLoggedInUser();
  }
  logout(): void {
    // Xóa thông tin người dùng khỏi localStorage hoặc sessionStorage khi đăng xuất
    this.auth.logout();
  }

  MyProfile(){
    const userId = this.auth.getUserId();
    this.Router.navigate(['/profile/'+userId])
  }
}
