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
  @Input() vipItem: VipModel = new VipModel();
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http:HttpClient) {}

  pay(amount: number){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    this.http.post<any>(API_URL.QR_MOMO(this.vipItem.name,amount),{}, {headers})
       .subscribe(response => {
        const redirectUrl = response['payUrl'];
       if (redirectUrl) { window.location.href = redirectUrl;
      } })
}

}
