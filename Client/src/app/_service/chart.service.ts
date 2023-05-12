import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from 'src/assets/API_URL';
import { PostQuantityByType, QuantityByTime, DetailPurchaseQuantityByType } from '../models/chart-model';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor(private http: HttpClient) {

   }
   getAccountByTime(): Observable<QuantityByTime> {
    return this.http.get<QuantityByTime>(API_URL.GET_ACCOUNT_BY_TIME(),{withCredentials: true});
  }

  getPostByTime(): Observable<QuantityByTime> {
    return this.http.get<QuantityByTime>(API_URL.GET_POST_BY_TIME(),{withCredentials: true});
  }

  getRevenueByTime(): Observable<QuantityByTime> {
    return this.http.get<QuantityByTime>(API_URL.GET_REVENUE_BY_TIME(),{withCredentials: true});
  }

  getPostByTransType(): Observable<PostQuantityByType[]> {
    return this.http.get<PostQuantityByType[]>(API_URL.GET_POST_BY_TRANS_TYPE(),{withCredentials : true});
  }

  getDetailPurchaseByVipType(): Observable<DetailPurchaseQuantityByType[]> {
    return this.http.get<DetailPurchaseQuantityByType[]>(API_URL.GET_DETAIL_PURCHASE_BY_VIP_TYPE(),{withCredentials : true});
  }
}
