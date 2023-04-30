import { Component } from '@angular/core';
import { PostService } from 'src/app/_service/post.service';
import { PagingModel } from 'src/app/models/paging-model';
import { PostModel } from 'src/app/models/post-model';
import { PROPERTY_INFOR } from 'src/assets/common/propertyInfor';

@Component({
  selector: 'app-card-approve-table',
  templateUrl: './card-approve-table.component.html',
  styleUrls: ['./card-approve-table.component.css']
})
export class CardApproveTableComponent {
  status: number = PROPERTY_INFOR.isApprove;
  unapprovedPosts: PostModel[]=  [];

  defaultPaging: PagingModel = {
    skipCount : 0,
    maxResultCount : PROPERTY_INFOR.maxResultCount,
  }

  paging: PagingModel = JSON.parse(JSON.stringify(this.defaultPaging));

  isLoading: boolean = false;
  isFullItem: boolean = false;
  constructor(private postService: PostService) {}


  ngOnInit(): void {
    this.getUnapprovedPost(this.paging);
  }

  getUnapprovedPost(paging: PagingModel){

    this.isLoading = true;
    this.postService.getUnapprovedPosts(paging)
    .subscribe(
      respone =>{
        this.isLoading = false
        var {skipCount, maxResultCount} = respone.pagination;

        this.unapprovedPosts = [...this.unapprovedPosts, ...respone.listItem];
        paging.skipCount = skipCount + maxResultCount;

        if(paging.skipCount >= respone.totalCount){
          this.isFullItem = true;
        }
        else{
          this.isFullItem = false;
        }
      },
      error => {
        this.isLoading = false
      }
    )
  }

}
