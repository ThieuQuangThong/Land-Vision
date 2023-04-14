import { CategoryModel } from "./category-model";
import { DistrictModel } from "./district-model";
import { PositionModel } from "./position-model";
import { StreetModel } from "./street-model";
import { WardModel } from "./ward-model";

export class PropertyModel {
  area: number = 0;
  frontangeArea: number = 0;
  price: number = 0;
  juridical: number = 0;
  isInterior: boolean = false;
  direction: string ="";
  addressNumber: string = "";
  wayIn: number = 0;
  numberOfFloor:number = 0;
  numberOfBed: number = 0;
  numberOfBath: number = 0;
  categoryId: number = 0;
  streetId: number = 0;
  wardId: number = 0;
  districtId: number = 0;
  positions:PositionModel[] = [];
  category: CategoryModel = new CategoryModel();
  street: StreetModel = new StreetModel();
  ward: WardModel = new WardModel();
  district: DistrictModel = new DistrictModel();
}
