import { Component, Input } from '@angular/core';
import { NearByServiceService } from 'src/app/_service/near-by-service.service';
import { ShareDataService } from 'src/app/_service/share-data.service';
import { PlaceModel } from 'src/app/models/place-model';
import { PositionModel } from 'src/app/models/position-model';

@Component({
  selector: 'app-relative-building-tab',
  templateUrl: './relative-building-tab.component.html',
  styleUrls: ['./relative-building-tab.component.css']
})
export class RelativeBuildingTabComponent {
  openTab = 1;
  @Input() positions: PositionModel[] = [];
  icons: string[] =['fa-solid fa-school text-base mr-1','fa-solid fa-store mr-1','fas fa-briefcase text-base mr-1','fas fa-briefcase text-base mr-1','fas fa-briefcase text-base mr-1','fas fa-briefcase text-base mr-1'];
  texts: string[] = ['Schools','Markets','Parks','Hopitals', 'restaurants','MyPosition'];
  buildingSearch: string[] = ['trường', 'siêu thị', 'Công viên', 'Bệnh', 'Nhà hàng']
  currentBuildingSearchs: PlaceModel[] =[]
  constructor(private shareService: ShareDataService, private nearByServiceService :NearByServiceService) {
     }

  toggleTabs($tabNumber: number){
    this.openTab = $tabNumber;
    this.currentBuildingSearchs = this.nearByServiceService.onCloseLocation({latitude:this.positions[0].latitude.toString(), longtitude: this.positions[0].longtitude.toString()},2, this.buildingSearch[$tabNumber-1])


  }
}
