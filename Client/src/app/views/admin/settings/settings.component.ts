import { Component, OnInit } from "@angular/core";
import { NgbCarouselConfig } from "@ng-bootstrap/ng-bootstrap";
import { PostService } from "src/app/_service/post.service";
import { PagingModel } from "src/app/models/paging-model";
import { PostModel } from "src/app/models/post-model";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  openTab = 1;
  toggleTabs($tabNumber: number){
    this.openTab = $tabNumber;
  }
  selectedDistrict: string ='';
  selectedWards: string ='';
  selectedStreet: string ='';
  selectedAddress: string ='';
  images = [];

  constructor(config: NgbCarouselConfig) {
    // customize default values of carousels used by this component tree
    config.interval = 2000;
    config.keyboard = true;
    config.pauseOnHover = true;
  }
  onDropdownChange() {

    this.selectedAddress = `${this.selectedDistrict}, ${this.selectedWards}, ${this.selectedStreet}`;
  }

  ngOnInit() {}

}
