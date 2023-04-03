import { CategoryModel } from "./category-model";
import { PositionModel } from "./position-model";
import { StreetModel } from "./street-model";

export class PropertyModel {
  area: number = 0;
  frontangeArea: number = 0;
  price: number = 0;
  juridical: number = 0;
  isInterior: boolean = false;
  direction: string ="";
  addressNumber: number = 0;
  wayIn: number = 0;
  numberOfFloor:number = 0;
  numberOfBed: number = 0;
  numberOfBath: number = 0;
  positions:PositionModel[] = [];
  category: CategoryModel = new CategoryModel();
  street: StreetModel = new StreetModel();
}
