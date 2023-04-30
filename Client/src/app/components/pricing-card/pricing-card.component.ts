import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { VipModel } from 'src/app/models/vip-model';
import { API_URL } from 'src/assets/API_URL';

@Component({
  selector: 'app-pricing-card',
  templateUrl: './pricing-card.component.html',
  styleUrls: ['./pricing-card.component.css']
})
export class PricingCardComponent {
  orderInfoo : string ='';
  @Input() vipItem: VipModel = new VipModel();
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http:HttpClient) {}

  pay(orderInfo : number, amount : number)
  {
    switch (orderInfo){
      case 1 : this.orderInfoo = 'Gói Fortune'; break;
      case 2 : this.orderInfoo = 'Gói Wealth'; break;
      case 3 : this.orderInfoo = 'Gói Prosperous'; break;
    }
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    this.http.post<any>(API_URL.QR_MOMO(this.orderInfoo,amount),{}, {headers})
       .subscribe(response => {
        const redirectUrl = response['payUrl'];
       if (redirectUrl) { window.location.href = redirectUrl;
      } })
}

}
