
import { UserModel } from "./user-model";
import { VipModel } from "./vip-model";

export class DetailPurchaseModel {
  id: number = 0;
  transactionDate = new Date();
  user : UserModel = new UserModel ();
  vip : VipModel = new VipModel ();
}
