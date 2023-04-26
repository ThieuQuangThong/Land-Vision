import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_service/auth.service';
import { DetailPurchaseService } from 'src/app/_service/detail-purchase.service';
import { UserService } from 'src/app/_service/user.service';

@Component({
  selector: 'app-success-payment',
  templateUrl: './success-payment.component.html',
  styleUrls: ['./success-payment.component.css']
})
export class SuccessPaymentComponent implements OnInit{
   urlParams = new URLSearchParams(window.location.search);
   partnerCode = this.urlParams.get('partnerCode');
   orderId = this.urlParams.get('orderId');
   requestId = this.urlParams.get('requestId');
   amount = this.urlParams.get('amount');
   orderInfo = this.urlParams.get('orderInfo');
   orderType = this.urlParams.get('orderType');
   transId = this.urlParams.get('transId');
   resultCode = this.urlParams.get('resultCode');
   message = this.urlParams.get('message');
   payType = this.urlParams.get('payType');
   responseTime = this.urlParams.get('responseTime');
   extraData = this.urlParams.get('extraData');
   signature = this.urlParams.get('signature');
   vipId : number =0;
  ngOnInit(): void {
    if(this.message =='Successful.'){
      this.upDateVip();
    }
    console.log(this.message);

  }
  constructor(private http :HttpClient,
    private auth:AuthService,
    private userService:UserService,
    private router : Router,
    private detailPurchaseService : DetailPurchaseService
    ){

  }
  upDateVip() {
    switch (this.orderInfo){
      case 'Gói Fortune' : this.vipId = 1; break;
      case 'Gói Wealth' : this.vipId = 2; break;
      case 'Gói Prosperous' : this.vipId = 4; break;
    }
    const userId = this.auth.getUserId();
    this.userService.updateVip(userId,this.vipId).subscribe();
    this.detailPurchaseService.addDetailPurchase(userId,this.vipId).subscribe();

  }
  goBackToProFile(){
    this.router.navigate(['/profile']);
  }
}
