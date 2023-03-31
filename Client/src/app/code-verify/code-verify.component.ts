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
  get f() {
    return this.verifyForm.controls;
  }

  first: any;
  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router, private auth: AuthService) { }
  ngOnInit(): void {
    this.verifyForm = this.fb.group([
      this.first = ['', Validators.required],

    ])
  }
  route() {
    this.router.navigate(['reset-password'])
  }

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
    // this.auth.verifyEmail(this.first)
  }

}
