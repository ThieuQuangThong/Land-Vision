import { PagingModel } from "./paging-model";
import { UserModel } from "./user-model";

export class UserResponeModel {
  listItem: UserModel[] = [];
  pagination: PagingModel = new PagingModel();
  totalCount: number = 0;
}
