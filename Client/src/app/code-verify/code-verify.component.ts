import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxOtpInputConfig } from "ngx-otp-input";
import { AlertService } from '../_service/alert.service';
import { AuthService } from '../_service/auth.service';
@Component({
  selector: 'app-code-verify',
  templateUrl: './code-verify.component.html',
  styleUrls: ['./code-verify.component.css']
})

export class CodeVerifyComponent implements OnInit {
  @Output() verifySubmitted = new EventEmitter<{ email: string, code: string }>();

  verifyForm!: FormGroup;
  otpInputConfig: NgxOtpInputConfig = {
    otpLength: 6,
    autofocus: true,
    classList: {
      inputBox: 'my-super-box-class',
      input: 'my-super-class',
      inputFilled: 'my-super-filled-class',
      inputDisabled: 'my-super-disable-class',
      inputSuccess: 'my-super-success-class',
      inputError: 'my-super-error-class',
    },

  };


  getcode: any;
  code: any;
  constructor(private route: ActivatedRoute, private http: HttpClient, private fb: FormBuilder, private router: Router, private auth: AuthService) { }
  email:string ="";
  ngOnInit(): void {
    this.email = this.auth.decode(this.route.snapshot.paramMap.get('email')!)
    this.verifyForm = this.fb.group({
      code: ['', Validators.required],
    });
    this.handleFillEvent(this.getcode)
    this.obfuscateEmail(this.email)
  }
  handleFillEvent(hai: string): void {
    this.getcode = hai;
    this.verifyForm.patchValue({
      code: this.getcode,
    });
  }
  handeOtpChange(value: string[]): void {

  }

  obfuscateEmail(email: string): string {
    const parts = email.split('@');
    const username = parts[0];
    const obfuscated = username.substring(0, 4) + '*'.repeat(username.length - 2) ;
    return obfuscated + '@' + parts[1];
  }
  getData(email: any, code: any) {
    const data = {
      email: email,
      code: code
    };
    const url = 'https://localhost:7165/api/Account/validateCode';
    return this.http.post(url, data).subscribe((response: any) => {
      AlertService.setAlertModel("success", "Please enter your new password!")
      this.router.navigate(['new-password/'+ this.auth.encode(code) +"/"+ this.auth.encode(email)])
    },
    (error) =>{
      AlertService.setAlertModel("danger", "Some thing went wrong!")
    });
  }

  resend(email: string) {
    return this.auth.forgotPassword(email).subscribe((res: any) =>{
      AlertService.setAlertModel("success", "Check your email!")

    },err=>{
      AlertService.setAlertModel("danger", "Some thing went wrong!")

    })
  }
  OnSubmit() {

    const code = this.getcode
    this.getData(this.email, code);
  }


}
