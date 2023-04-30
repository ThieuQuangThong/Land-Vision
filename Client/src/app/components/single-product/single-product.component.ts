import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PostModel } from 'src/app/models/post-model';
import { PROPERTY_INFOR } from 'src/assets/common/propertyInfor';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent {
  @Input() status: number = PROPERTY_INFOR.isView;
  @Input() postItem: PostModel = new PostModel();

transactionTypes: string[] = PROPERTY_INFOR.TransactionTypes;

constructor(private router: Router) {}

  goToDetail(){
    if(this.status === PROPERTY_INFOR.isView){
      this.router.navigate([`productdetails/${this.postItem.id}`])
    }

    else if(this.status === PROPERTY_INFOR.isUpdate){
      this.router.navigate([`update-posting/${this.postItem.id}`])
    }
    else if(this.status === PROPERTY_INFOR.isApprove){
      this.router.navigate([`/admin/approveDetail/${this.postItem.id}`])
    }
  }
}
