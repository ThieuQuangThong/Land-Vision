import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PagingModel } from '../models/paging-model';
import { UserResponeModel } from '../models/user-respone-model';
import { Observable } from 'rxjs';
import { API_URL } from 'src/assets/API_URL';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAllUser(pagingModel: PagingModel):Observable<UserResponeModel> {
    return this.http.get<UserResponeModel>(API_URL.GET_ALL_USER(pagingModel),{withCredentials: true})
  }
}
