import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../_service/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetForm!: FormGroup;
  submitted = false;

  get f() {
    return this.resetForm.controls
  }


  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService) { }
  ngOnInit(): void {
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    })
  }


  OnSubmit() {
    this.submitted = true;
    if (this.resetForm.invalid) {
      return
    }
    this.auth.email = this.resetForm.value['email']
    this.forgotPassword(this.resetForm.value['email'])


  }

  Routerloader(){
    this.router.navigate(['code-verify'])
  }
  forgotPassword(email: string) {
    this.auth.forgotPassword(email).subscribe(res => {
      alert("ok, Check your email to get code")
      setTimeout(() => {
        this.Routerloader()
      }, 2000);

    },
      (err) => {
        alert("The account was not registed!")
        console.log(err);
      })
    }
}
