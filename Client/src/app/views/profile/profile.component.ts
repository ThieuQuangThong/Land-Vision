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

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]

})
export class ProfileComponent implements OnInit {

  @ViewChild('dialog') myDialog: ElementRef | undefined;

  openDialog:boolean = true;
  ischangingProfile: boolean = false;
  status:number = PROPERTY_INFOR.isUpdate;
  isMyProfile: boolean = false;
  postUserId: number = 0;
  userPosts: PostModel[] = [];
  userInfor: UserInfor = new UserInfor();

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
    if(user!.nameid !== userId){
      this.getApprovedPostByUserId(userId);
    }
    else{
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
    this.postService.getPostsByUserId(userId)
    .subscribe(
      respone =>{
        this.userPosts = respone;
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
    const user = this.auth.getUserProfile() ?? new User();
    const file = event.target.files[0];
    this.imageService.convertFileToUrl(file)
    .subscribe(
      respone => {
        this.userService.editSingleFieldUser(user.nameid,respone,PATCH_PATH.USER.AVAVAR_LINK)
        .subscribe(
          _ => {
            this.userInfor.avatarLink = respone;
            this.auth.setUserInfor(this.userInfor);
          }
        )
      }
    );
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
  }

  open(){
    this.openDialog = false;
  }
  close(){
    this.openDialog = true;
    this.contactInformationChanging = JSON.parse(JSON.stringify(this.initContactInformation));
    this.myDialog?.nativeElement.close();
  }

}
