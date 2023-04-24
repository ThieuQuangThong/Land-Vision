import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from 'src/assets/API_URL';
import { VipResponeModel } from '../models/vip-response-model';
import { VipModel } from '../models/vip-model';


@Injectable({
  providedIn: 'root'
})
export class VipService {

  constructor(private http:HttpClient) { }
  getAllVip():Observable<VipModel[]>{
    return this.http.get<VipModel[]>(API_URL.GET_ALL_VIP(),{withCredentials: true})
  }
}
