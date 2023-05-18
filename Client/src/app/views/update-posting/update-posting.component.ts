import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AlertService } from 'src/app/_service/alert.service';
import { AuthService } from 'src/app/_service/auth.service';
import { CategoryService } from 'src/app/_service/category.service';
import { CityInformationService } from 'src/app/_service/city-information.service';
import { PostService } from 'src/app/_service/post.service';
import { ShareDataService } from 'src/app/_service/share-data.service';
import { CategoryModel } from 'src/app/models/category-model';
import { DistrictModel } from 'src/app/models/district-model';
import { ImageModel } from 'src/app/models/image-model';
import { PostModel } from 'src/app/models/post-model';
import { PostRequest, PostWithoutProperty } from 'src/app/models/post-request';
import { StreetModel } from 'src/app/models/street-model';
import { WardModel } from 'src/app/models/ward-model';
import { PROPERTY_INFOR } from 'src/assets/common/propertyInfor';
import { inforStreet } from '../posting/posting.component';

@Component({
  selector: 'app-update-posting',
  templateUrl: './update-posting.component.html',
  styleUrls: ['./update-posting.component.css']
})
export class UpdatePostingComponent {
  postId: number = 0;
  currentPosting: PostModel = new PostModel();

  isReject: boolean = false;
  rejectReasonText: string ='';
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
    private location: Location,
    private route: ActivatedRoute,
    private shareDataService: ShareDataService,
    private postService: PostService,
    private auth:AuthService,
    private categgoryService: CategoryService,
    private cityService: CityInformationService) {
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

    this.getAndSetWardByDistrictId(this.postRequest.property.districtId,false);
    this.getAndSetStreetByDistrictId(this.postRequest.property.districtId,false);
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
    const encodeId = this.route.snapshot.params['postId'];

    this.postId = Number(this.auth.decode(encodeId));
    this.postService.getPostById(this.postId,true)
    .subscribe(
      respone => {
        if(respone.approveStatus === PROPERTY_INFOR.isReject){
          this.isReject = true;
          this.rejectReasonText = respone.rejectReason;
        }
        this.postRequest.property = respone.property;
        this.postRequest.post = respone as PostWithoutProperty
        this.openTab = respone.transactionType

        this.shareDataService.setImageSlideValue(respone.images.map(
          x => x.linkImage
        ))

        this.postRequest.property.districtId = respone.property.district.id;
        this.currentSeletedInfor.districtName = respone.property.district.name;
        this.getAndSetWardByDistrictId(this.postRequest.property.districtId);
        this.getAndSetStreetByDistrictId(this.postRequest.property.districtId);

        this.postRequest.property.wardId = respone.property.ward.id;
        this.currentSeletedInfor.wardName = respone.property.ward.name;

        this.postRequest.property.streetId = respone.property.street.id;
        this.currentSeletedInfor.streetName = respone.property.street.name;

        this.postRequest.property.categoryId = respone.property.category.id;
        this.postRequest.property.direction = respone.property.direction;

        this.currentSeletedInforTracking.next(this.currentSeletedInfor);

        this.shareDataService.setPositionPost(this.postRequest.property.positions)
        this.getAndSetDistrict();
        this.getAndSetDirection();
        this.getAndSetCategory();
      },
      error => {
        AlertService.setAlertModel('danger','Some thing went wrong');
      }
    )
    this.currentSeletedInforTracking.subscribe(
      respone => {
        const {districtName, wardName, streetName} = respone;
        this.currentSeletedInfor =  {
          districtName: districtName,
          wardName: wardName,
          streetName: streetName,
        }
        this.postRequest.property.addressNumber = `${districtName}, ${wardName}, ${streetName}`;
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
        const {name,id} = respone[0];
        this.districts = respone;

        this.isDistrictLoading = false;
      },
      error =>{
        this.isDistrictLoading = false;
      }
    );
  }

  getAndSetWardByDistrictId(districtId: number, isGetData: boolean = true){
    this.isWardLoading = true;
    this.cityService.getWardByDistrictId(districtId).subscribe(
      respone =>{
        const {id, name} = respone[0];
        this.wards = respone;

        if(isGetData === false){
          this.postRequest.property.wardId = id;

          this.currentSeletedInfor.wardName = name;
          this.currentSeletedInforTracking.next(this.currentSeletedInfor);

        }

        this.isWardLoading = false;
      },
      error =>{
        this.isWardLoading = false;
      }

    );
  }

  getAndSetStreetByDistrictId(districtId: number, isGetData: boolean = true){
    this.isStreetLoading = true;
    this.cityService.getStreetByDistrictId(districtId).subscribe(
      respone =>{
        const {id, name} = respone[0];
        this.streets = respone;
        if(isGetData === false){
          this.postRequest.property.streetId = id;

          this.currentSeletedInfor.streetName = name;
          this.currentSeletedInforTracking.next(this.currentSeletedInfor);

        }
        this.isStreetLoading = false;
      },
      error =>{
        this.isStreetLoading = false;
      }
    )
  }

  submit(){
    this.isPosting = true;
    const userId = this.auth.getUserId();
    this.postRequest.property.positions = this.shareDataService.getPositionsValue();
    this.postRequest.post.images = this.shareDataService.getImageSlideValue().map(x => {
      const imageModel: ImageModel = {
        linkImage : x
      }
      return imageModel;
    });

    this.postService.updatePostById(this.postId,userId,this.postRequest)
    .subscribe(
      response =>{
        this.isPosting = false;
        this.shareDataService.setImageSlideValue([]);
        this.postRequest = new PostRequest();
        this.location.back();
        AlertService.setAlertModel('success','Update post successfully')
      },
      error => {
        this.isPosting = false;
        AlertService.setAlertModel('danger','Some thing went wrong')
      }
    )
  }

  delete(){
    if(confirm("Are you sure to delete")){
      this.postService.deletePostById(this.postId, this.auth.getUserId())
      .subscribe(
        _ =>{
          this.location.back();
          AlertService.setAlertModel('success','Delete successfully')
        },
        erorr =>{
          AlertService.setAlertModel('danger','Some thing went wrong')
        }
      )
    }
    }

}
