import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetForm!: FormGroup;
  submitted = false;
  email: any;
   get f(){
    return this.resetForm.controls
  }


  constructor(private fb: FormBuilder, private router: Router, ){}
  ngOnInit(): void {
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    })
  }

  OnSubmit(){
    this.submitted = true;
    if(this.resetForm.invalid){
      return
    }
    this.router.navigate(['code-verify'])
  }
}
