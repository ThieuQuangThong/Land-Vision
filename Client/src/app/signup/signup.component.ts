import { DOCUMENT } from '@angular/common';
import { HttpClient} from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FileUploadService } from '../_service/file-upload.service';
import { AlertService } from '../_service/alert.service';
import { API_URL } from 'src/assets/API_URL';
import { AuthenIdentifyCardService } from '../_service/authen-identify-card.service';

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

  constructor(private http: HttpClient,private authenIdentifyCardService: AuthenIdentifyCardService,
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
      phone: ['', [Validators.required, Validators.pattern("[0-9]{10}")]],

    })
  }

  signupdata(registrationForm: FormGroup) {

    this.http.post<any>(API_URL.REGISTER_ACCOUNT(), registrationForm.value)
      .subscribe(res => {
        AlertService.setAlertModel("success","Create an account successfully!")
        this.route.navigate(['login'])

      }, _err => {
        AlertService.setAlertModel("danger","Some thing went wrong")
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
    this.registrationForm.value['identityNumber'] = this.authenIdentifyCardService.numberOfIdCard;
    this.signupdata(this.registrationForm)
  }

}
