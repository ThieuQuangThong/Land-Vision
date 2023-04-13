import { Component, OnInit, SimpleChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import { CityInformationService } from 'src/app/_service/city-information.service';
import { DistrictModel } from 'src/app/models/district-model';
import { StreetModel } from 'src/app/models/street-model';
import { WardModel } from 'src/app/models/ward-model';

export class inforStreet {
  districtName: string ="";
  wardName: string ="";
  streetName: string ="";
}
@Component({
  selector: 'app-posting',
  templateUrl: './posting.component.html',
  styleUrls: ['./posting.component.css']
})

export class PostingComponent implements OnInit {
  openTab = 1;
  directions: string[] = [];
  districts: DistrictModel[] = [];
  wards: WardModel[] = [];
  streets: StreetModel[] = [];
  isDistrictLoading: boolean = false;
  isWardLoading: boolean = false;
  isStreetLoading: boolean = false;

  constructor(private cityService: CityInformationService) {
  }

  toggleTabs($tabNumber: number){
    this.openTab = $tabNumber;
  }
  currentSeletedInforTracking = new BehaviorSubject<inforStreet>(new inforStreet());
  currentSeletedInfor= new inforStreet();
  selectedDistrictId: number = 1;
  selectedWardId: number = 1;
  selectedStreetId: number = 1;
  selectedAddress: string ='';

  onDropdownDistrictChange(event: any) {

    this.currentSeletedInfor.districtName = this.filterTextContent(event);
    this.currentSeletedInforTracking.next(this.currentSeletedInfor);

    this.getAndSetWardByDistrictId(this.selectedDistrictId);
    this.getAndSetStreetByDistrictId(this.selectedDistrictId);
  }

  onDropdownWardChange(event: any) {
    this.currentSeletedInfor.wardName = this.filterTextContent(event);
    this.currentSeletedInforTracking.next(this.currentSeletedInfor);
  }

  onDropdownStreetChange(event: any) {
    this.currentSeletedInfor.streetName = this.filterTextContent(event);
    this.currentSeletedInforTracking.next(this.currentSeletedInfor);
  }

  filterTextContent(event: any): string{
    const selectElement = event.target as HTMLSelectElement;
    const selectedOption = selectElement.selectedOptions[0];
    const selectedOptionText = selectedOption.textContent;
    return selectedOptionText ?? "";
  }

  ngOnInit() {
    this.getAndSetDistrict();
    this.getAndSetWardByDistrictId(this.selectedDistrictId);
    this.getAndSetStreetByDistrictId(this.selectedDistrictId);
    this.getAndSetDirection();
    this.currentSeletedInforTracking.subscribe(
      respone => {
        const {districtName, wardName, streetName} = respone;
        this.currentSeletedInfor =  {
          districtName: districtName,
          wardName: wardName,
          streetName: streetName,
        }
        this.selectedAddress = `${districtName}, ${wardName}, ${streetName}`;
      }
    )
  }

  getAndSetDirection(){
    this.cityService.getDirections()
    .subscribe(
      respone =>{
        this.directions = respone;
      })
    }


  getAndSetDistrict(){
    this.isDistrictLoading = true;
    this.cityService.getDistrict().subscribe(
      respone =>{
        const {name} = respone[0];
        this.currentSeletedInfor.districtName = name;
        this.districts = respone;

        this.currentSeletedInforTracking.next(this.currentSeletedInfor);
        this.isDistrictLoading = false;
      },
      error =>{
        this.isDistrictLoading = false;
      }
    );
  }

  getAndSetWardByDistrictId(districtId: number){
    this.isWardLoading = true;
    this.cityService.getWardByDistrictId(districtId).subscribe(
      respone =>{
        const {id, name} = respone[0];
        this.wards = respone;
        this.selectedWardId = respone[0]?.id;

        this.currentSeletedInfor.wardName = name;
        this.currentSeletedInforTracking.next(this.currentSeletedInfor);

        this.isWardLoading = false;
      },
      error =>{
        this.isWardLoading = false;
      }

    );
  }

  getAndSetStreetByDistrictId(districtId: number){
    this.isStreetLoading = true;
    this.cityService.getStreetByDistrictId(districtId).subscribe(
      respone =>{
        const {id, name} = respone[0];
        this.streets = respone;
        this.selectedStreetId = id;

        this.currentSeletedInfor.streetName = name;
        this.currentSeletedInforTracking.next(this.currentSeletedInfor);

        this.isStreetLoading = false;
      },
      error =>{
        this.isStreetLoading = false;
      }
    )
  }
}
