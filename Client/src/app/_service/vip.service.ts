import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from 'src/assets/API_URL';
import { VipRequestModel } from '../models/vip-request-model';
import { VipModel } from '../models/vip-model';


@Injectable({
  providedIn: 'root'
})
export class VipService {

  constructor(private http:HttpClient) { }
  getAllVip():Observable<VipModel[]>{
    return this.http.get<VipModel[]>(API_URL.GET_ALL_VIP(),{withCredentials: true})
  }
  getVipById(packageId : number):Observable<VipModel>{
    return this.http.get<VipModel>(API_URL.GET_VIP_BY_ID(packageId),{withCredentials: true})
  }
  addVip(vipRequestModel : VipRequestModel):Observable<any>{
    return this.http.post<any>(API_URL.ADD_VIP(),vipRequestModel)
  }
  updateVip(packageId :number,vipRequestModel : VipRequestModel):Observable<any>{
    return this.http.put<any>(API_URL.UPDATE_VIP(packageId),vipRequestModel)
  }
  deleteVip(packageId : number){
    return this.http.delete<any>(API_URL.DELETE_VIP(packageId))
  }
}
