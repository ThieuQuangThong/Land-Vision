import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { AuthService } from '../_service/auth.service';

@Component({
  selector: 'app-code-verify',
  templateUrl: './code-verify.component.html',
  styleUrls: ['./code-verify.component.css']
})
export class CodeVerifyComponent  implements OnInit{


  first: any;
  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService){}
  ngOnInit(): void {
    this.verifyForm = this.fb.group([
      this.first= ['', Validators.required],

    ])
  }
  route(){
    this.router.navigate(['reset-password'])
  }
  verifyForm!: FormGroup;
  get f(){
    return this.verifyForm.controls;
  }


}
