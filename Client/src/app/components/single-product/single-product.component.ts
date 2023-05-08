import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/_service/auth.service';
import { PostModel } from 'src/app/models/post-model';
import { PROPERTY_INFOR } from 'src/assets/common/propertyInfor';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent {
  @Input() postUserId: number = 0;
  @Input() status: number = PROPERTY_INFOR.isView;
  @Input() postItem: PostModel = new PostModel();

  transactionTypes: string[] = PROPERTY_INFOR.TransactionTypes;
  id : number = 0;
constructor(private router: Router, private auth: AuthService, private route: ActivatedRoute) {}

  goToDetail(){
    // this.postId = this.route.snapshot.params['postId'];
    const user = this.auth.getUserProfile();
    const encodedPostId = this.auth.encode(this.postItem.id.toString());

    if(this.status === PROPERTY_INFOR.isApprove && user?.role === PROPERTY_INFOR.Role.admin ){
      this.router.navigate([`/admin/approveDetail/${this.postItem.id}`])
    }
    else if( user=== null || this.status === PROPERTY_INFOR.isView || user.role === PROPERTY_INFOR.Role.admin || this.postUserId !== user.nameid ){
      this.router.navigate([`productdetails/${encodedPostId}`])
    }
    else if(this.status === PROPERTY_INFOR.isUpdate && user.role !== PROPERTY_INFOR.Role.admin ){
      this.router.navigate([`update-posting/${this.postItem.id}`])
    }
  }

}
