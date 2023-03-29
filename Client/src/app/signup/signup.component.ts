import { DOCUMENT } from '@angular/common';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../_service/auth.service';
import { TokenModel } from '../_service/token.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


  submitted = false;
  password: any;
  signup!: FormGroup;
  signuser: any;
  userName!: string;
  email!: any;

  get f() {
    return this.signup.controls
  }
  constructor(private http: HttpClient, private route: Router, private fb: FormBuilder, @Inject(DOCUMENT) private document: Document){}

  ngOnInit(): void {
    this.signup = this.fb.group({
      name: ['',Validators.required, Validators.name],
      email: ['', [Validators.required ,Validators.email]],
      frontOfIdentityCard: ['',Validators.required, Validators.name],
      backOfIdentityCard:['', Validators.required, Validators.maxLength(15)],
      password: ['',[Validators.required, Validators.maxLength(15)]],
      identityNumber: ['',[Validators.required, Validators.maxLength(15)]]
    })
  }

  signupdata(signup: FormGroup){

    this.http.post<any>("https://localhost:44380/api/Authorization/Registration", this.signup.value)
    .subscribe(res =>{
      alert("Create an account successfully!");

      this.route.navigate(['login'])
    },_err=>{
      alert('Something was wrong');

    })
  }

  onSubmit() {
    this.submitted = true;
    // this.loading = true;
    // stop here if form is invalid
    if (this.signup.invalid) {
        return ;
    }

    this.signupdata(this.signup)
  }

}
