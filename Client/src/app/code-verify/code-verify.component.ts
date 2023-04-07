import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, first, tap } from 'rxjs';
import { AuthService } from '../_service/auth.service';
import { AlertService } from '../_service/alert.service';

@Component({
  selector: 'app-code-verify',
  templateUrl: './code-verify.component.html',
  styleUrls: ['./code-verify.component.css']
})

export class CodeVerifyComponent implements OnInit {
  @Output() verifySubmitted = new EventEmitter<{ email: string, code: string }>();

  verifyForm!: FormGroup;
  // get f() {
  //   return this.verifyForm.controls;
  // }

  code: any;
  constructor(private route: ActivatedRoute, private http: HttpClient, private fb: FormBuilder, private router: Router, private auth: AuthService) { }
  email:string ="";
  ngOnInit(): void {
    this.email = this.route.snapshot.paramMap.get('email')!;
    this.verifyForm = this.fb.group({
      code: ['', Validators.required],
    });
  }
  onVerifySubmit() {
    if (this.verifyForm.valid) {
      const email = this.auth.email;
      const code = this.verifyForm.value.code;
      this.verifySubmitted.emit({ email, code });
    }
  }
  getData(email: any, code: any) {
    const data = {
      email: email,
      code: code
    };
    const url = 'https://localhost:7165/api/Account/validateCode';
    return this.http.post(url, data).subscribe((response: any) => {
      AlertService.setAlertModel("success", "Please enter your new password!")
      this.router.navigate(['new-password/'+code+"/"+ this.email])
    },
    (error) =>{
      AlertService.setAlertModel("danger", "Some thing went wrong!")
    });
  }
  OnSubmit() {
    console.log(this.auth.email)
    const code = this.verifyForm?.get('code')?.value;
    this.getData(this.email, code);
    console.log(code)
  }


}
