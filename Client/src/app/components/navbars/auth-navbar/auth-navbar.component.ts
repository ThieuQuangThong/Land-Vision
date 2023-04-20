import { Component, ElementRef, EventEmitter, HostListener, OnInit, Output, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-auth-navbar",
  templateUrl: "./auth-navbar.component.html",
})
export class AuthNavbarComponent implements OnInit {
  navbarOpen = false;
  @Output() messageEvent = new EventEmitter<any>();
  constructor(private elementRef: ElementRef, public translate: TranslateService,public router: Router) {}

  @HostListener('window:resize')
  onResize() {

    this.messageEvent.emit(this.elementRef.nativeElement.querySelector('#auth-nav').offsetHeight);
  }

  ngAfterViewInit() {
    this.messageEvent.emit(this.elementRef.nativeElement.querySelector('#auth-nav').offsetHeight);
  }

    ngOnInit(): void {
    }
    translateLanguageTo(lang: string) {

      this.translate.use(lang);
    }

  setNavbarOpen() {
    this.navbarOpen = !this.navbarOpen;
  }
}
