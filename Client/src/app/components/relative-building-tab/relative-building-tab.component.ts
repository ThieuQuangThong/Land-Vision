import { Component } from '@angular/core';
import { NearByServiceService } from 'src/app/_service/near-by-service.service';
import { PlaceModel } from 'src/app/models/place-model';

@Component({
  selector: 'app-relative-building-tab',
  templateUrl: './relative-building-tab.component.html',
  styleUrls: ['./relative-building-tab.component.css']
})
export class RelativeBuildingTabComponent {
  openTab = 1;
  icons: string[] =['fas fa-space-shuttle text-base mr-1','fas fa-cog text-base mr-1','fas fa-briefcase text-base mr-1','fas fa-briefcase text-base mr-1','fas fa-briefcase text-base mr-1','fas fa-briefcase text-base mr-1'];
  texts: string[] = ['Schools','Markets','Parks','Hopitals', 'restaurants','My Position'];
  buildingSearch: string[] = ['trường', 'siêu thị', 'Công viên', 'Bệnh', 'Nhà hàng']
  currentBuildingSearchs: PlaceModel[] =[]
  constructor(private nearByServiceService :NearByServiceService) {
     }

  toggleTabs($tabNumber: number){
    this.openTab = $tabNumber;
    const lat = 16.008983808041833;
    const lng = 108.20735225558515;
    this.currentBuildingSearchs = this.nearByServiceService.onCloseLocation({latitude:lat.toString(), longtitude: lng.toString()},2, this.buildingSearch[$tabNumber-1])
  }
}
