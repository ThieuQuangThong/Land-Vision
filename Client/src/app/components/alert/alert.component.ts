import { Component } from '@angular/core';
import { AlertService } from 'src/app/_service/alert.service';
import { AlertModel } from 'src/app/models/alert-model';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],

})
export class AlertComponent {
  constructor() {
  }
    initAlert: AlertModel =
    {
    isAlert:false,
    type:'success',
    text: 'success',
    }

  alertModel:AlertModel[] = [
    this.initAlert,
  ];

    ngOnInit(): void {
      AlertService.getAlertModel()
      .subscribe(
        respone =>{
            this.alertModel[0] = respone;
      })
    }
    close()
    {
        this.alertModel[0] = this.initAlert;
    }
}
