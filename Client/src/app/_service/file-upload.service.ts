import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from './auth.service';
import { API_URL } from 'src/assets/API_URL';
import { Observable } from 'rxjs';
import * as type from 'esri/smartMapping/renderers/type';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  upload!: FormGroup;
  file1: any;
  file2: any;
  imageFile1: File | null = null;
  imageFile2: File | null = null;
  imageUrl1!: string
  imageUrl2!: string

  constructor(private auth: AuthService,private fb: FormBuilder,
    private http: HttpClient){}
  ngOnInit(): void {

      this.upload = this.fb.group({
        file1: [''],
        file2: ['']
      })


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
    }
  }
  onImageSelected2(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length) {
      this.imageFile2 = fileInput.files[0];
    }
  }
  onSubmitfile() {

    this.onUpload2()
    this.onUpload1()
  }

  convertFileToUrl(file: File): Observable<any>{
    const formData = new FormData();
    formData.append('formFile', file, file.name);
    return this.http.post(API_URL.CONVERT_FILE_IMAGE_TO_URL(), formData,{responseType: 'text'})
  }

  convertEventTofile(event: Event): File {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    return files[0];
  }

  onUpload1(): void {
    if (this.imageFile1) {
      const url = API_URL.CONVERT_FILE_IMAGE_TO_URL();
      const formFile = new FormData();
      formFile.append('formFile', this.imageFile1);

      this.http.post(url, formFile,{responseType: 'text'}).subscribe(
        (response: any) => {
         this.imageUrl1 =response
         console.log(this.imageUrl1)
        },
        (error: any) => {
          console.error(error);
        }
      );
    }
  }
   base64toFile(base64String: string, filename: string): File {

    const byteCharacters = atob(btoa(base64String));
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays);
    return new File([blob], filename, { type: 'image/png'});
  }
  onUpload2(): void {
    if (this.imageFile2) {
      const url = API_URL.CONVERT_FILE_IMAGE_TO_URL();
      const formFile2 = new FormData();
      formFile2.append('formFile', this.imageFile2);

      this.http.post(url, formFile2,{responseType: 'text'}).subscribe(
        (response2: any) => {
         this.imageUrl2 =response2
         console.log(this.imageUrl2)
        },
        (error: any) => {
          console.error(error);
        }
      );
    }
  }
}
