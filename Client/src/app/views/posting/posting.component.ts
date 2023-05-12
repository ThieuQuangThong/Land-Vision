import { ShareDataService } from './../../_service/share-data.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AlertService } from 'src/app/_service/alert.service';
import { AuthService } from 'src/app/_service/auth.service';
import { CategoryService } from 'src/app/_service/category.service';
import { CityInformationService } from 'src/app/_service/city-information.service';
import { PostService } from 'src/app/_service/post.service';
import { CategoryModel } from 'src/app/models/category-model';
import { DistrictModel } from 'src/app/models/district-model';
import { ImageModel } from 'src/app/models/image-model';
import { PostRequest } from 'src/app/models/post-request';
import { StreetModel } from 'src/app/models/street-model';
import { WardModel } from 'src/app/models/ward-model';
import { PROPERTY_INFOR } from 'src/assets/common/propertyInfor';

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
  isPosting: boolean = false;
  postRequest: PostRequest = new PostRequest();

  openTab = 1;
  interiors: string[] = PROPERTY_INFOR.Interior;
  directions: string[] = [];
  juridicals: string[] = PROPERTY_INFOR.juridicals;
  districts: DistrictModel[] = [];
  categorys: CategoryModel[] =[];
  wards: WardModel[] = [];
  streets: StreetModel[] = [];
  isDistrictLoading: boolean = false;
  isWardLoading: boolean = false;
  isStreetLoading: boolean = false;

  constructor(
    private router: Router,
    private shareDataService: ShareDataService,
    private postService: PostService,
    private auth:AuthService,
    private categgoryService: CategoryService,
    private cityService: CityInformationService,
    private formBuilder: FormBuilder) {
      this.postForm = this.formBuilder.group({
        title: ['', Validators.required],
        description: ['', Validators.required],
        area: ['', Validators.required],
        price: ['', Validators.required],
        direction: ['', Validators.required],
        interior: ['', Validators.required],
        juridical: ['', Validators.required],
        frontangeArea: ['', Validators.required],
        wayIn: ['', Validators.required],
        numberOfFloor: ['', Validators.required],
        numberOfBed: ['', Validators.required],
        numberOfBath: ['', Validators.required]
      });
  }


  postForm!: FormGroup;

  submitForm() {

  }
  // Accessor for easy form control access
  get f() {
    return this.postForm.controls;
  }

  toggleTabs($tabNumber: number){
    this.postRequest.post.transactionType = $tabNumber;
    this.openTab = $tabNumber;
  }

  currentSeletedInforTracking = new BehaviorSubject<inforStreet>(new inforStreet());
  currentSeletedInfor= new inforStreet();

  onDropdownDistrictChange(event: any) {

    this.currentSeletedInfor.districtName = this.filterTextContent(event);
    this.currentSeletedInforTracking.next(this.currentSeletedInfor);

    this.getAndSetWardByDistrictId(this.postRequest.property.districtId);
    this.getAndSetStreetByDistrictId(this.postRequest.property.districtId);
  }

  onDropdownCategoryChange(event: any) {}

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
        this.postRequest.property.addressNumber = `${streetName}, ${wardName}, ${districtName}`;
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
        this.postRequest.property.categoryId = respone[0].id;
      }
    )
  }

  getAndSetDistrict(){
    this.isDistrictLoading = true;
    this.cityService.getDistrict().subscribe(
      respone =>{
        const {name,id} = respone[0];
        this.currentSeletedInfor.districtName = name;
        this.districts = respone;
        this.postRequest.property.districtId = id
        this.getAndSetWardByDistrictId(id);
        this.getAndSetStreetByDistrictId(id);
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
        this.postRequest.property.wardId = id;

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
        this.postRequest.property.streetId = id;

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
    if (this.postForm.invalid) {
      // Mark all fields as touched to display validation errors
      this.postForm.markAllAsTouched();
    }
    this.isPosting = true;
    const userId = this.auth.getUserId();
    this.postRequest.property.positions = this.shareDataService.getPositionsValue();
    this.postRequest.post.images = this.shareDataService.getImageSlideValue().map(x => {
      const imageModel: ImageModel = {
        linkImage : x
      }
      return imageModel;
    });

    this.postService.addPost(this.postRequest, userId)
    .subscribe(
      response =>{
        this.isPosting = false;
        this.shareDataService.setImageSlideValue([]);
        this.postRequest = new PostRequest();
        this.router.navigate(['/landing']);
        AlertService.setAlertModel('success','Add post successfully')
      },
      error => {
        this.isPosting = false;
        AlertService.setAlertModel('danger','Some thing went wrong')
      }
    )

  }
}
