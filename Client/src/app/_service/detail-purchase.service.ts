import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from 'src/assets/API_URL';
import { DetailPurchaseModel } from '../models/detailPurchase-model';

@Injectable({
  providedIn: 'root'
})
export class DetailPurchaseService {

  detailPurchaseModel : DetailPurchaseModel = new DetailPurchaseModel ()
  constructor(private http : HttpClient) { }
  addDetailPurchase(userId :number, vipId :number):Observable<any>{
    return this.http.post<any>(API_URL.ADD_DETAIL_PURCHASE(userId,vipId),this.detailPurchaseModel);
  }
}
