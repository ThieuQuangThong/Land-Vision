import { ImageModel } from "./image-model";
import { PropertyModel } from "./property-model";
import { UserModel } from "./user-model";

export class PostModel {
  id: number = 0;
  title: string = "";
  description: string = "";
  transactionType: number =0;
  numberOfView: number = 0;
  isVerified:boolean = false;
  property: PropertyModel = new PropertyModel();
  user: UserModel = new UserModel();
  images: ImageModel[] = [];
}
