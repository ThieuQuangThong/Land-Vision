import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../_service/auth.service';
import { API_URL } from 'src/assets/API_URL';
import { AlertService } from '../_service/alert.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit {


  newpassForm!: FormGroup;
  email:string ="";
  code:string="";
  constructor(private route: ActivatedRoute, private http: HttpClient, private fb: FormBuilder, private router: Router, private auth: AuthService) { }


  ngOnInit(): void {
    this.email = this.auth.decode(this.route.snapshot.paramMap.get('email')!);
    this.code = this.auth.decode(this.route.snapshot.paramMap.get('code')!);
    this.newpassForm = this.fb.group({
      password: [''],
      confirmPassword: [''],
    });
  }
  getData(email: any, code: string, password: any) {
    const data = {
      email: email,
      code: code,
      password: password

    };
    const url = API_URL.RESET_PASSWORD();
    return this.http.post(url, data,{withCredentials:true}).subscribe((response: any) => {
      AlertService.setAlertModel("success","Change password successfully");
      this.router.navigate(['/login'])

    },
    error => {
      AlertService.setAlertModel("danger","Some thing went wrong");
    });
  }

  OnSubmit() {
    this.getData(this.email, this.code, this.newpassForm.value['password'])
  }
}
