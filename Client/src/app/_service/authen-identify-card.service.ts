import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from 'src/assets/API_URL';

@Injectable({
  providedIn: 'root'
})
export class AuthenIdentifyCardService {

  constructor(private http: HttpClient) {}
  numberOfIdCard: string ='';

  checkIdentifyCard(urlImage: string): Observable<any>{
    const headers = new HttpHeaders({
      'content-type': "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW",
      'api_key': 'pZX7LOoZiSsHSYzWE2bwL8hIHvqdcNFq'
    });
    const payload = `------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"image_url\"\r\n\r\n${urlImage}\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW--`

    return this.http.post(API_URL.CHECK_IDENTIFY_CARD(),payload,{headers:headers})
  }
}
