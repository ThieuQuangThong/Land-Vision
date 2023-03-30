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

   get f(){
    return this.resetForm.controls
  }


  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService){}
  ngOnInit(): void {
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    })
  }

  sendEmail(data: string){
    return this
  }
  OnSubmit(){
    this.submitted = true;
    if(this.resetForm.invalid){
      return
    }
    // this.forgotPassword(this.resetForm.value['email'])
    // this.router.navigate(['/code-verify'])

    // this.auth.forgotPassword(this.resetForm.value)
    //   .subscribe((res) => {
    //     if (res.code == 200) {
    //       alert("ok")
    //     }
    //     else {
    //       alert("not ok")

    //     }
    //   },
    //     (err) => {
    //       console.log(err);
    //     })
  }
  forgotPassword(email: string){
    this.auth.forgotPassword(email).subscribe(res =>{
              if (res.code == 200) {
          alert("ok")
        }
        else {
          alert("not ok")

        }
      },
        (err) => {
          console.log(err);
    })
  }
  }
