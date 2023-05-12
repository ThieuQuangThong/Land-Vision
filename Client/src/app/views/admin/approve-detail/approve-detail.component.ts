import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/_service/alert.service';
import { AuthService } from 'src/app/_service/auth.service';
import { PostService } from 'src/app/_service/post.service';
import { ShareDataService } from 'src/app/_service/share-data.service';
import { PostModel } from 'src/app/models/post-model';
import { RejectModel } from 'src/app/models/reject-model';
import { PROPERTY_INFOR } from 'src/assets/common/propertyInfor';

@Component({
  selector: 'app-approve-detail',
  templateUrl: './approve-detail.component.html',
  styleUrls: ['./approve-detail.component.css']
})
export class ApproveDetailComponent {

  @ViewChild('dialog') myDialog: ElementRef | undefined;

  rejectReasonText: string = '';
  postItem: PostModel = new PostModel()
  postId: number = 0;
  rejectReasons: string[] = PROPERTY_INFOR.RejectReasons;
  selectedRejectReason: string = '0'
  isChooseOtherReason: boolean = false;

  constructor(
    private auth: AuthService,
    private shareDataService: ShareDataService,
    private route: ActivatedRoute,
    private postService: PostService,
    private router: Router,
    ) {}

  ngOnInit() {
    this.postId = this.route.snapshot.params['postId'];

    this.shareDataService.setPositionPost([]);
    this.postService.getPostById(this.postId)
    .subscribe(
      respone => {
        this.postItem = respone;
        this.shareDataService.setPositionPost(respone.property.positions);
        this.shareDataService.setImageSlideValue(this.postItem.images.map(x => x.linkImage));
      },
      error =>{
        AlertService.setAlertModel('danger','Some thing went wrong')
      }
    )
  }

  approve(){
    this.postService.approvePost(this.postId)
    .subscribe(
      _ =>{
        this.router.navigate(['/admin/approveTables'])
        AlertService.setAlertModel('success','Successfully approve')
      },
      erorr =>{
        AlertService.setAlertModel('danger','Some thing went wrong')
      }
    )
  }

  delete(){
    if(confirm("Are you to delete")){
      const userId = this.auth.getUserId();
      this.postService.deletePostById(this.postId, userId)
      .subscribe(
        _ => {
          this.router.navigate(['/admin/approveTables'])
          AlertService.setAlertModel('success','Successfully delete')
        },
        erorr =>{
          AlertService.setAlertModel('danger','Some thing went wrong')
        }
      )
    }
  }

  filterTextContent(event: any): string{
    const selectElement = event.target as HTMLSelectElement;
    const selectedOption = selectElement.selectedOptions[0];
    const selectedOptionText = selectedOption.textContent;
    return selectedOptionText ?? "";
  }

  close(){
    this.myDialog?.nativeElement.close();
  }

  onDropdownReasonChange(event: any){

    if(this.selectedRejectReason === (PROPERTY_INFOR.RejectReasons.length-1).toString()){
      this.isChooseOtherReason = true;
    }
    else{
      this.isChooseOtherReason = false;
    }
  }

  save(){
    let currentRejectReason = '';
    if(this.selectedRejectReason === (PROPERTY_INFOR.RejectReasons.length-1).toString()){
      currentRejectReason = this.rejectReasonText;
    }
    else{
      currentRejectReason = PROPERTY_INFOR.RejectReasons[Number(this.selectedRejectReason)];
    }
    const rejectModel: RejectModel = {
      rejectReason: currentRejectReason
    }

    this.postService.rejectPostById(this.postId,rejectModel)
    .subscribe(
      respone =>{
        this.router.navigate(['/admin/approveTables'])
      },
      erorr =>{

      }
    )
  }
}
