import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-header-stats",
  templateUrl: "./header-stats.component.html",
})
export class HeaderStatsComponent implements OnInit {
  constructor( public translate: TranslateService) {}

  ngOnInit(): void {}
  translateLanguageTo(lang: string) {

    this.translate.use(lang);
  }
}
