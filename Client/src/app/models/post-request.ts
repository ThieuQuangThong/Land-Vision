import { PostModel } from "./post-model";
import { PropertyModel } from "./property-model";

export class PostRequest {
  post: PostModel = new PostModel();
  property: PropertyModel = new PropertyModel();
}
