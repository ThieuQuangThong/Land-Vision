import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from 'src/assets/API_URL';
import { DetailPurchaseModel } from '../models/detailPurchase-model';
import { DetailPurchaseRequestModel } from '../models/detailPurchase-request-model';

@Injectable({
  providedIn: 'root'
})
export class DetailPurchaseService {

  detailPurchaseModel : DetailPurchaseRequestModel = new DetailPurchaseRequestModel ()
  constructor(private http : HttpClient) { }
  addDetailPurchase(userId :number, vipId :number):Observable<any>{
    return this.http.post<any>(API_URL.ADD_DETAIL_PURCHASE(userId,vipId),this.detailPurchaseModel);
  }
  getDetailPurchase():Observable<DetailPurchaseModel[]>{
    return this.http.get<DetailPurchaseModel[]>(API_URL.GET_DETAIL_PURCHASE(),{withCredentials: true});
  }
  getRevenue():Observable<any>{
    return this.http.get<any>(API_URL.GET_REVENUE(),{withCredentials: true})
  }
}
