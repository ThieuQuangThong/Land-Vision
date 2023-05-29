import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AlertModel } from '../models/alert-model';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private static alertModel: BehaviorSubject<AlertModel> = new BehaviorSubject({});
  constructor() { }
  isTimeOutRunning : boolean = false;
  static setAlertModel(type:string = "success", text:string =""){
    console.log(46564564564);

    const alert : AlertModel = {
      isAlert : true,
      type : type,
      text : text,
    }

    this.alertModel.next(alert);
  }

  static getAlertModel(): Observable<AlertModel>{
    return this.alertModel.asObservable();
  }

}
