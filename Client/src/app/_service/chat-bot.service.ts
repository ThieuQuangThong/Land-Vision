import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from 'src/assets/API_URL';

@Injectable({
  providedIn: 'root'
})
export class ChatBotService {

  constructor(private http : HttpClient) {

   }
  chatChit(message: string): Observable<any> {
          const formData = new FormData();
          formData.append('user_text', message);

          const url: string = 'http://ec2-13-250-102-212.ap-southeast-1.compute.amazonaws.com:8001/message';

          return this.http.post(url, formData);
      }
}
