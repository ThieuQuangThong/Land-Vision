import { Component, ElementRef, EventEmitter, HostListener, OnInit, Output, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { AlertService } from "src/app/_service/alert.service";
import { AuthService } from "src/app/_service/auth.service";
import { PostService } from "src/app/_service/post.service";

@Component({
  selector: "app-auth-navbar",
  templateUrl: "./auth-navbar.component.html",
})
export class AuthNavbarComponent implements OnInit {
  navbarOpen = false;
  @Output() messageEvent = new EventEmitter<any>();

  constructor(
    private auth: AuthService,
    private elementRef: ElementRef,
    public translate: TranslateService,
    public router: Router,
    private postService: PostService
    ){}

  ngOnInit(): void {
    this.isLoggin()
  }

  @HostListener('window:resize')

  onResize() {
    this.messageEvent.emit(this.elementRef.nativeElement.querySelector('#auth-nav').offsetHeight);
  }

  ngAfterViewInit() {
    this.messageEvent.emit(this.elementRef.nativeElement.querySelector('#auth-nav').offsetHeight);
  }

  onPosting(){
    const userId = this.auth.getUserId();
    this.postService.checkIsUserAvailableToPost(userId)
    .subscribe(
      respone =>{
        if(respone == true){
          this.router.navigate(['/posting']);
        }
        else {
          this.router.navigate(['/pricing']);
          AlertService.setAlertModel('warn',"You must buy more package to post!");
        }
      },
      erorr =>{
        AlertService.setAlertModel('danger',"You need to login to use posting");
        this.router.navigate(['/login']);

      }
    )
  }

    translateLanguageTo(lang: string) {
      this.translate.use(lang);
    }

  setNavbarOpen() {
    this.navbarOpen = !this.navbarOpen;
  }

  isLoggin(){
    const userId = this.auth.getUserId();
    this.postService.checkIsUserAvailableToPost(userId)
    .subscribe(
      respone =>{
        if(respone == true){

        }
        else {
          

        }
      },
      erorr =>{
        console.log(0);

      }
    )
  }
}
