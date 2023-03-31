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
  // get f() {
  //   return this.verifyForm.controls;
  // }

  code: any;
  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
    this.verifyForm = this.fb.group({
      code: ['', Validators.required],
    });
  }

  getData(email: any, code: any) {
    const data = {
      email: email,
      code: code
    };
    const url = 'https://localhost:7165/api/Account/validateCode';
    return this.http.post(url, data).subscribe((response: any) => {
      console.log(response);
      alert("ok")
      this.router.navigate(['new-password/'+this.code])

    });
  }
  OnSubmit() {
    console.log(this.auth.email)
    const code = this.verifyForm?.get('code')?.value;
    this.getData(this.auth.email, code);

  }


}
