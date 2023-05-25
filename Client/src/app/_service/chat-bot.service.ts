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

          const url: string = 'http://58.186.76.206/message';

          return this.http.post(url, formData);
      }

      search(data: any): Observable<any>{
        const formData = new FormData();
        formData.append('name_address', data.name_address);
        formData.append('latitude', data.latitude);
        formData.append('longitude', data.longitude);

        const url: string = 'http://58.186.76.206/real_estate_search';

          return this.http.post(url, formData);
      }
}
