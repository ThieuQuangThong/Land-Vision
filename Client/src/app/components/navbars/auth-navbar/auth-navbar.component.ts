import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-auth-navbar",
  templateUrl: "./auth-navbar.component.html",
})
export class AuthNavbarComponent implements OnInit {
  navbarOpen = false;

  constructor(public translate: TranslateService,public router: Router) {}

    ngOnInit(): void {}
    translateLanguageTo(lang: string) {

      this.translate.use(lang);
    }

  setNavbarOpen() {
    this.navbarOpen = !this.navbarOpen;
  }
}
