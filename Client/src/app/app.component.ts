import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  title = 'Client';

  constructor(
    public translate: TranslateService
  ){
    translate.addLangs(['en','vi']);
    translate.setDefaultLang('en');
  }

  ngOnInit() {

  }
}
