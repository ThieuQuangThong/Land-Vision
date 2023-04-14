import { Component, OnInit, SimpleChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import { AlertService } from 'src/app/_service/alert.service';
import { AuthService } from 'src/app/_service/auth.service';
import { CategoryService } from 'src/app/_service/category.service';
import { CityInformationService } from 'src/app/_service/city-information.service';
import { FileUploadService } from 'src/app/_service/file-upload.service';
import { PostService } from 'src/app/_service/post.service';
import { CategoryModel } from 'src/app/models/category-model';
import { DistrictModel } from 'src/app/models/district-model';
import { PostModel } from 'src/app/models/post-model';
import { PostRequest } from 'src/app/models/post-request';
import { PropertyModel } from 'src/app/models/property-model';
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
  categorys: CategoryModel[] =[];
  wards: WardModel[] = [];
  streets: StreetModel[] = [];
  isDistrictLoading: boolean = false;
  isWardLoading: boolean = false;
  isStreetLoading: boolean = false;
  buildingImage: string ='';
  title: string = '';
  description: string = '';
  area: number = 0;
  price: number = 0;
  frontangeArea: number = 0;
  wayIn: number = 0;
  numberOfFloor: number = 0;
  numberOfBed: number = 0;
  numberOfBath: number = 0;
  selectedDirectionId: number = 0;
  selectedInterior: boolean = false;

  constructor(private postService: PostService, private auth:AuthService, private categgoryService: CategoryService ,private uploadService:FileUploadService , private cityService: CityInformationService) {
  }

  toggleTabs($tabNumber: number){
    this.openTab = $tabNumber;
  }
  currentSeletedInforTracking = new BehaviorSubject<inforStreet>(new inforStreet());
  currentSeletedInfor= new inforStreet();
  selectedDistrictId: number = 1;
  selectedCategoryId: number = 1;
  selectedWardId: number = 1;
  selectedStreetId: number = 1;
  selectedAddress: string ='';

  onDropdownDistrictChange(event: any) {
    console.log(this.selectedDistrictId);

    this.currentSeletedInfor.districtName = this.filterTextContent(event);
    this.currentSeletedInforTracking.next(this.currentSeletedInfor);

    this.getAndSetWardByDistrictId(this.selectedDistrictId);
    this.getAndSetStreetByDistrictId(this.selectedDistrictId);
  }

  onDropdownCategoryChange(event: any) {

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
    this.getAndSetCategory();
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

  getAndSetCategory(){
    this.categgoryService.getCategory()
    .subscribe(
      respone => {
        this.categorys = respone;
      }
    )
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

  upLoadImage(event:any){
    const file = this.uploadService.convertEventTofile(event);
    this.uploadService.convertFileToUrl(file)
    .subscribe(
      respone =>{
        this.buildingImage = respone;
      }
    )
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

  submit(){
    const userId = this.auth.getUserId();
    const postRequest: PostRequest = new PostRequest();
    const property: PropertyModel = new PropertyModel();
    const postModel: PostModel = new PostModel();

    property.categoryId = this.selectedCategoryId;
    property.districtId = this.selectedDistrictId;
    property.wardId = this.selectedWardId;
    property.streetId = this.selectedStreetId;
    property.addressNumber = this.selectedAddress;
    property.area = this.area;
    property.price = this.price;
    property.frontangeArea = this.frontangeArea;
    property.wayIn = this.wayIn;
    property.numberOfBath = this.numberOfBath;
    property.numberOfFloor = this.numberOfFloor;
    property.numberOfBed = this.numberOfBed;
    property.districtId = this.selectedDirectionId;
    property.isInterior = this.selectedInterior;

    postModel.title = this.title;
    postModel.description = this.description;

    this.postService.addPost(postRequest, userId)
    .subscribe(
      response =>{
        AlertService.setAlertModel('success','Add post successfully')
      },
      error => {
        AlertService.setAlertModel('danger','Some thing went wrong')
      }
    )
  }
}
