import { HttpRequest } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../_service/auth.service';
import { TokenModel } from '../_service/token.model';
import { AlertService } from '../_service/alert.service';
import { TranslateService } from '@ngx-translate/core';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  req: HttpRequest<any> | undefined;
  email: any;
  password: any;
  loginForm!: FormGroup;
  submitted = false;
  show = false;
  user: any;
  loggedIn: any;
  loading: boolean = false;
  get f(){
    return this.loginForm.controls;
  }

  constructor(private auth: AuthService, private fb: FormBuilder, private route: Router){}

  ngOnInit(): void {
    this.password= "password"

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]]
    })
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

   login() {
    this.loading = true;
    const email = this.loginForm?.get('email')?.value;
    const password = this.loginForm?.get('password')?.value;
    this.auth.login(email, password).subscribe((response) => {
      this.loading = false;
        const token:TokenModel = new TokenModel()
        token.accessToken = response
          localStorage.setItem("token",JSON.stringify(token));
          AlertService.setAlertModel('success',"Login successfully")
          this.route.navigate(['landing'])
          // this.toast.success({detail: "Welcome you !", summary:response.message, duration: 5000})

        // console.log(this.userProfile)
    },err=>{
      this.loading = false;
      // this.toast.error({detail: "Error Message", summary:"Something was wrong !", duration: 5000})
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
