import { PagingModel } from "./paging-model";
import { PostModel } from "./post-model";

export class PostResponeModel {
  listItem: PostModel[] = [];
  pagination: PagingModel = new PagingModel();
  totalCount: number = 0;
}
