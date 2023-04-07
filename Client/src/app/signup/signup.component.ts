import { DOCUMENT } from '@angular/common';
import { HttpClient, HttpEventType, HttpRequest, HttpResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FileUploadService } from '../_service/file-upload.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


  submitted = false;
  password: any;
  registrationForm !: FormGroup;
  signuser: any;
  userName!: string;
  email!: any;


  get f() {
    return this.registrationForm.controls
  }

  constructor(private http: HttpClient,
    private route: Router, private fb: FormBuilder,
    @Inject(DOCUMENT) private document: Document,
    private fileService: FileUploadService,

  ) { }
  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required, Validators.name],
      email: ['', [Validators.required, Validators.email]],
      frontOfIdentityCard: ['', Validators.required, Validators.name],
      backOfIdentityCard: ['', Validators.required, Validators.maxLength(15)],
      password: ['', [Validators.required, Validators.maxLength(15)]],
      confirmPassword: ['', Validators.required],
      identityNumber: ['', [Validators.required, Validators.maxLength(15)]],
      phoneNumber: ['', [Validators.required, Validators.pattern("[0-9]{10}")]],

    })

  }



  signupdata(registrationForm: FormGroup) {

    this.http.post<any>("https://localhost:7165/api/Account/RegisterAccount", this.registrationForm.value)
      .subscribe(res => {
        alert("Create an account successfully!");

        this.route.navigate(['login'])
      }, _err => {
        alert('Something was wrong');

      })
  }


  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registrationForm.invalid) {
        return ;
    }


    this.registrationForm.value['frontOfIdentityCard']= this.fileService.imageFile1
    this.registrationForm.value['backOfIdentityCard']= this.fileService.imageFile2

    this.signupdata(this.registrationForm)

  }

}
