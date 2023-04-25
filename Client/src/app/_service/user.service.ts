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

  getUserCount():Observable<number> {
    return this.http.get<number>(API_URL.GET_USER_COUNT(),{withCredentials: true})
  }

  getAllUser(pagingModel: PagingModel):Observable<UserResponeModel> {
    return this.http.get<UserResponeModel>(API_URL.GET_ALL_USER(pagingModel),{withCredentials: true})
  }

  updateVip(userId : number, vipId : number):Observable<any> {
    return this.http.put<any>(API_URL.UPDATE_USER_VIP(userId,vipId),{withCredentials: true})

  }
}
