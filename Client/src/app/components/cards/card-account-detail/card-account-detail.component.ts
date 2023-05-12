import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/_service/auth.service';
import { UserInfor } from 'src/app/_service/user.model';
import { CardAccountTableComponent } from '../card-account-table/card-account-table.component';
import { PostModel } from 'src/app/models/post-model';
import { PostService } from 'src/app/_service/post.service';
import { PROPERTY_INFOR } from 'src/assets/common/propertyInfor';

@Component({
  selector: 'app-card-account-detail',
  templateUrl: './card-account-detail.component.html',
  styleUrls: ['./card-account-detail.component.css']
})
export class CardAccountDetailComponent implements OnInit{
  status:number = PROPERTY_INFOR.isToUpdate;
  userInfor: UserInfor = new UserInfor();
  userId:number = 0;
  postUserId: number = 0;
  userPosts: PostModel[] = [];
  constructor(private postService: PostService, private auth: AuthService,public dialogRef : MatDialogRef<CardAccountTableComponent>,

    @Inject(MAT_DIALOG_DATA) public data: { id:  number }){}
  ngOnInit(): void {
    this.userId = this.data.id;
    this.auth.getUserInforById(this.userId)
    .subscribe(
      respone => {
        this.userInfor = respone;
      })

      this.postService.getPostsByUserId(this.userId)
    .subscribe(
      respone =>{
        this.userPosts = respone;
      })
  }

}
