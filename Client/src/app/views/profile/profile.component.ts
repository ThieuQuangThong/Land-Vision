import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AlertService } from "src/app/_service/alert.service";
import { AuthService } from "src/app/_service/auth.service";
import { User, UserInfor } from "src/app/_service/user.model";
import { Clipboard } from '@angular/cdk/clipboard';
import { PostService } from "src/app/_service/post.service";
import { PostModel } from "src/app/models/post-model";
import { PROPERTY_INFOR } from "src/assets/common/propertyInfor";
import { UserService } from "src/app/_service/user.service";
import { PATCH_PATH } from "src/assets/API_URL";
import { ContactInformation } from "src/app/models/update-contact-information-model";
import { FileUploadService } from "src/app/_service/file-upload.service";
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { log } from "esri/config";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]

})
export class ProfileComponent implements OnInit {

  @ViewChild('dialog') myDialog: ElementRef | undefined;
  @ViewChild('dialogImage') myDialogImage: ElementRef | undefined;

  imgChangeEvt: any = '';
  cropImgPreview: string ='' ;

  openDialog:boolean = true;
  openDialogImage:boolean = true;
  ischangingProfile: boolean = false;
  status:number = PROPERTY_INFOR.isToUpdate;
  isMyProfile: boolean = false;
  postUserId: number = 0;
  userPosts: PostModel[] = [];
  userInfor: UserInfor = new UserInfor();
  isShowPostRemain: boolean = false;
  isLoading: boolean = false;

  contactInformationChanging: ContactInformation = new ContactInformation();
  initContactInformation: ContactInformation = new ContactInformation();

  constructor(
    private imageService: FileUploadService,
    private userService: UserService,
    private route: ActivatedRoute,
    private postService: PostService,
    private auth: AuthService,
    private clipboard :Clipboard) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.params['userId'];
    this.postUserId = userId;
    const user = this.auth.getUserProfile();
    if(user === null || user!.nameid !== userId){
      if(user?.role === PROPERTY_INFOR.Role.admin){
        this.isShowPostRemain = true;
      }
      this.getApprovedPostByUserId(userId);
    }
    else{
      this.isShowPostRemain = true;
      this.isMyProfile = true;
      this.getPostByUserId(userId);
    }
    this.getUserInforById(userId)
  }

  getUserInforById(userId: number){
    this.auth.getUserInforById(userId)
    .subscribe(
      respone => {
        const {phone, email, name}= respone;
        this.userInfor = respone;
        Object.assign(this.initContactInformation, {phone, name, email});
        this.contactInformationChanging = JSON.parse(JSON.stringify(this.initContactInformation));
      },
      erorr =>{
        AlertService.setAlertModel('danger','Some thing went wrong while loading user information!');
      }
    )
  }

  getApprovedPostByUserId(userId: number){
    this.postService.getApprovedPostByUserId(userId)
    .subscribe(
      respone => {
        this.userPosts = respone;
      },
      error => {
        AlertService.setAlertModel('danger', 'Some thing went wrong');
      }
    )
  }

  getPostByUserId(userId: number){
    this.isLoading = true;
    this.postService.getPostsByUserId(userId)
    .subscribe(
      respone =>{
        this.userPosts = respone;
        this.isLoading = false
      },
      error => {
        AlertService.setAlertModel('danger', 'Some thing went wrong');
      }
    )
  }
  copyText(textToCopy: string) {
    this.clipboard.copy(textToCopy);
    }

  editPhone(){
    const user = this.auth.getUserProfile() ?? new User();
    this.userService.editSingleFieldUser(user.nameid,"5",PATCH_PATH.USER.PHONE).subscribe()
  }

  fileChangeEvent(event: any){
    this.imgChangeEvt = event;

  }

  save(){
    this.ischangingProfile = true;
    const user = this.auth.getUserProfile() ?? new User();
  this.userService.editUserContactInformation(user.nameid,this.contactInformationChanging)
  .subscribe(
    _ => {
      const {phone, name, email } = this.contactInformationChanging as UserInfor;
      Object.assign(this.userInfor, {phone, name, email});
      this.ischangingProfile = false;
      this.myDialog?.nativeElement.close();

    },
    error =>{
      AlertService.setAlertModel('danger',"Some thing went wrong")
      this.ischangingProfile = false;
      this.myDialog?.nativeElement.close();
    }
  )
  this.openDialog = true;
  }
  saveImage(){

    const user = this.auth.getUserProfile() ?? new User();

    this.imageService.convertBase64ToUrl(this.cropImgPreview)
    .subscribe(
      respone => {
        this.userService.editSingleFieldUser(user.nameid,respone,PATCH_PATH.USER.AVAVAR_LINK)
        .subscribe(
          _ => {
            this.userInfor.avatarLink = respone;
            this.myDialogImage?.nativeElement.close();
            this.auth.setUserInfor(this.userInfor);
          }
        )
      }
    );
  }
  open(){
    this.openDialog = false;
  }
  openImageDialog(){
    this.openDialogImage = false;
  }
  close(){
    this.openDialog = true;
    this.contactInformationChanging = JSON.parse(JSON.stringify(this.initContactInformation));
    this.myDialog?.nativeElement.close();
  }

  closeImagePopup(){
    this.imgChangeEvt ='';
    this.cropImgPreview = '';
    this.myDialogImage?.nativeElement.close();
  }


  onFileChange(event: any): void {
    this.imgChangeEvt = event;
  }
  cropImg(e: ImageCroppedEvent) {
    this.cropImgPreview = e.base64!;
  }
  imgLoad() {
    // display cropper tool
  }
  initCropper() {
    // init cropper
  }

  imgFailed() {
    // error msg
  }

}
