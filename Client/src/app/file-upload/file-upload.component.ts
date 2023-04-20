import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_service/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { FileUploadService } from '../_service/file-upload.service';
import { API_URL } from 'src/assets/API_URL';
import { AuthenIdentifyCardService } from '../_service/authen-identify-card.service';
import { AlertService } from '../_service/alert.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  upload!: FormGroup;
  file1: any;
  file2: any;
  imageFile1: File | null = null;
  imageFile2: File | null = null;
  public imageUrl1!: string
  imageUrl2!: string

  constructor(private auth: AuthService,private fb: FormBuilder, private authenIdenCard: AuthenIdentifyCardService,
    private http: HttpClient, private fileService: FileUploadService){}
  ngOnInit(): void {

      this.upload = this.fb.group({
        file1: [''],
        file2: ['']
      })
      this.onUpload1()
  }
  onChange1(event:any) {
    this.file1 = event.target.files[0];
  }
  onChange2(event:any) {
    this.file1 = event.target.files[0];
  }
  onImageSelected1(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length) {
      this.imageFile1 = fileInput.files[0];
      this.onUpload1();
    }
  }
  onImageSelected2(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length) {
      this.imageFile2 = fileInput.files[0];
      this.onUpload2()
    }
  }
  onSubmit() {
    this.onUpload1
    this.onUpload2
  }

  onUpload1(): void {
    if (this.imageFile1) {
      const url = API_URL.CONVERT_FILE_IMAGE_TO_URL();
      const formFile = new FormData();
      formFile.append('formFile', this.imageFile1);

      this.http.post(url, formFile,{responseType: 'text'}).subscribe(
        (response: any) => {
         this.authenIdenCard.checkIdentifyCard(response)
         .subscribe(
          inforRes => {
            this.authenIdenCard.numberOfIdCard =  inforRes.data[0].id;
            this.imageUrl1 = response;
            this.fileService.imageFile1 = response;

          },
          erorr =>{
              console.log(erorr.error.errorMessage);

            AlertService.setAlertModel("danger",'sfefes')
          }
         )

         this.fileService.imageFile1 = response
        //  console.log(this.imageUrl1)
        },
        (error: any) => {
          AlertService.setAlertModel('danger','Some thing went wrong')
          console.error(error);
        }
      );
    }
  }

  onUpload2(): void {
    if (this.imageFile2) {
      const url = API_URL.CONVERT_FILE_IMAGE_TO_URL();
      const formFile2 = new FormData();
      formFile2.append('formFile', this.imageFile2);

      this.http.post(url, formFile2,{responseType: 'text'}).subscribe(
        (response2: any) => {
         this.imageUrl2 =response2
         this.fileService.imageFile2 = response2

        },
        (error: any) => {
          AlertService.setAlertModel('danger','Some thing went wrong')
          console.error(error);
        }
      );
    }
  }
}
