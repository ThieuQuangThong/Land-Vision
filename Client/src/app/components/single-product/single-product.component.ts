import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PostModel } from 'src/app/models/post-model';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent {
  @Input() isView: boolean = true;
  @Input() postItem: PostModel = new PostModel();

constructor(private router: Router) {}

  goToDetail(){
    if(this.isView === true){
      this.router.navigate([`productdetails/${this.postItem.id}`])
    }
    else{
      this.router.navigate([`update-posting/${this.postItem.id}`])
    }
  }
}
