import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, first, tap } from 'rxjs';
import { AuthService } from '../_service/auth.service';

@Component({
  selector: 'app-code-verify',
  templateUrl: './code-verify.component.html',
  styleUrls: ['./code-verify.component.css']
})
export class CodeVerifyComponent implements OnInit {

  verifyForm!: FormGroup;
<<<<<<< HEAD
  get f() {
    return this.verifyForm.controls;
  }

  first: any;
  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router, private auth: AuthService) { }
  ngOnInit(): void {
    this.verifyForm = this.fb.group([
      this.first = ['', Validators.required],

    ])
=======
  // get f() {
  //   return this.verifyForm.controls;
  // }

  code: any;
  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
    this.verifyForm = this.fb.group({
      code: ['', Validators.required],
    });
>>>>>>> 54bdd7e69e5efe03b007c4fddedce24dc67a378d
  }
  route() {
    this.router.navigate(['reset-password'])
  }

<<<<<<< HEAD
  compareCode(email: string, code: string){
    const body = {
      email: email,
      code: code,
    };
    return this.http.post('https://localhost:7165/api/Account/validateCode',body,{responseType: 'text'})
    console.log(body)
  }

  OnSubmit() {
    console.log(this.auth.email)
=======
  compareCode(data: any) {

    return this.http.post('https://localhost:7165/api/Account/validateCode', data, { responseType: 'text' })
  }
   mycode!: string;
  getData(email: any, code: any) {
    const data = {
      email: email,
      code: code
    };


    const url = 'https://localhost:7165/api/Account/validateCode';
    return this.http.post(url, data).subscribe((response: any) => {
      console.log(response);
      alert("ok")
      this.router.navigate(['new-password/' + this.code])

    });
  }
  OnSubmit() {
    console.log(this.auth.email)
    this.getData(this.auth.email, this.code=this.verifyForm?.get('code')?.value)

>>>>>>> 54bdd7e69e5efe03b007c4fddedce24dc67a378d
    // this.auth.verifyEmail(this.first)
  }

}
