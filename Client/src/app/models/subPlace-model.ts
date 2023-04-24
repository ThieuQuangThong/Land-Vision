import { PositionModel } from "./position-model";

export class SubPlaceModel {
  distance: number = 0;
  goTime: number = 0;
  position?: PositionModel = new PositionModel();
}
