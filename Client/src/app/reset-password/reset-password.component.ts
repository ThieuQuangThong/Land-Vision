import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../_service/auth.service';
import { AlertService } from '../_service/alert.service';

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


  forgotPassword(email: string) {
    this.auth.forgotPassword(email).subscribe(res => {
      AlertService.setAlertModel("success", "Please Check your mail!")
      this.router.navigate(['code-verify/'+ email])

    },
      (err) => {
        AlertService.setAlertModel("danger", "This email is registed yet!")
        console.log(err);
      })
    }
}
