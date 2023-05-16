import { ImageModel } from "./image-model";
import { PropertyModel } from "./property-model";
import { UserModel } from "./user-model";

export class PostWithoutProperty {
  id: number = 0;
  title: string = "";
  description: string = "";
  transactionType: number =0;
  numberOfView: number = 0;
  rejectReason: string ="";
  createDate! : Date;
  isVerified:boolean = false;
  isHide:boolean = false;
  user: UserModel = new UserModel();
  images: ImageModel[] = [];
}
export class PostRequest {
  post: PostWithoutProperty = new PostWithoutProperty();
  property: PropertyModel = new PropertyModel();
}
