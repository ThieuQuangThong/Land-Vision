import { HttpRequest } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '../_service/alert.service';
import { AuthService } from '../_service/auth.service';
import { LoginGooleModel } from '../models/LoginGoole-model';
import { ToastrService } from 'ngx-toastr';
import { FileUploadService } from '../_service/file-upload.service';
import { AuthenIdentifyCardService } from '../_service/authen-identify-card.service';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit{
  rememberMe: boolean = false;
  req: HttpRequest<any> | undefined;
  email: any;
  password: any;
  loginForm!: FormGroup;
  submitted = false;
  show = false;
  user: any;
  loggedIn: any;
  loading: boolean = false;
  loginWithGoogleModel: LoginGooleModel = new LoginGooleModel();

  frontOfIdCard: string = '';
  backOfIdCard: string = '';
  numberOfIdCard: string = '';


  get f(){
    return this.loginForm.controls;
  }
  auth2: any;

  @ViewChild('loginRef', {static: true }) loginElement!: ElementRef;
  @ViewChild('dialog') myDialog: ElementRef | undefined;

  constructor(
     public toastr: ToastrService,
     private auth: AuthService,
     private fb: FormBuilder,
     private router: Router,
     private fileUploadService: FileUploadService,
     private authenIdentifyCardService: AuthenIdentifyCardService){}

  ngOnInit(): void {
    this.googleAuthSDK()
    this.password= "password"

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]]
    })
   }

   FrontOfCardEvent(event: any){
      const file = this.fileUploadService.convertEventTofile(event);
      this.fileUploadService.convertFileToUrl(file)
      .subscribe(
        respone => {
          this.authenIdentifyCardService.checkIdentifyCard(respone)
          .subscribe(
            nestedRespone =>{
              this.frontOfIdCard = respone;
              this.numberOfIdCard = nestedRespone.data[0].id;
            },
            nestedError =>{
              AlertService.setAlertModel('danger','Id card is not clear!')
            }
          )
        },
        error =>{
          AlertService.setAlertModel('danger','Some thing went wrong!')
        }
      )
   }

   submitAgain(){
    this.loginWithGoogleModel.backOfIdentityCard = this.backOfIdCard;
    this.loginWithGoogleModel.frontOfIdentityCard = this.frontOfIdCard;
    this.loginWithGoogleModel.identityNumber = this.numberOfIdCard;

    this.loginWithGoogle(this.loginWithGoogleModel);

   }

   BackOfCardEvent(event: any){
    const file = this.fileUploadService.convertEventTofile(event);
    this.fileUploadService.convertFileToUrl(file)
    .subscribe(
      respone => {
        this.backOfIdCard = respone;
      }
    )
   }

   OnClick(){
     if(this.password === 'password'){
       this.password = 'text';
       this.show = true;
     }else{
       this.password = 'password';
       this.show = false
     }
   }

   callLoginButton() {
    this.auth2.attachClickHandler(this.loginElement.nativeElement, {prompt: 'select_account'},
      (googleAuthUser:any) => {
        console.log(googleAuthUser);

        let profile = googleAuthUser.getBasicProfile();

        const loginWithGoogle: LoginGooleModel = {
          name: profile.getName(),
          avatarLink: profile.getImageUrl(),
          email: profile.getEmail(),
          password:  googleAuthUser.getAuthResponse().id_token,
          phone:''
        }

        this.loginWithGoogleModel = loginWithGoogle;

        this.loginWithGoogle(this.loginWithGoogleModel);
      }, (error:any) => {
        console.log(error.status);

      });
  }

  loginWithGoogle(loginWithGoogle: LoginGooleModel){
    this.auth.loginWithGoogle(loginWithGoogle)
    .subscribe(
      respone => {
        AlertService.setAlertModel('success',"Login successfully")
        this.router.navigate(['landing'])
      },
      error =>{
        if(error.status === 400){
          this.myDialog?.nativeElement.showModal();
        }
        else{
          AlertService.setAlertModel('danger','Some thing went wrong')
        }
      }
    )
  }

  googleAuthSDK() {
    (<any>window)['googleSDKLoaded'] = () => {
      (<any>window)['gapi'].load('auth2', () => {
        this.auth2 = (<any>window)['gapi'].auth2.init({
          client_id: '713581749414-iqh079jalnl8hmuhcgsb7g5f57eqajca.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          plugin_name: 'hello'
        });
        this.callLoginButton();
      });
    }

    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement('script');
      js.id = id;
      js.src = "https://apis.google.com/js/platform.js?onload=googleSDKLoaded";
      fjs?.parentNode?.insertBefore(js, fjs);
    }(document, 'script', 'google-jssdk'));
  }

   login() {
    this.loading = true;
    const email = this.loginForm?.get('email')?.value;
    const password = this.loginForm?.get('password')?.value;
    this.auth.login(email, password).subscribe((response) => {
      this.loading = false;
          AlertService.setAlertModel('success',"Login successfully")
          this.router.navigate(['landing'])
    },err=>{
      this.loading = false;
      AlertService.setAlertModel('danger',err.error.message)
    })
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return ;
    }

      this.login()
  }
}
