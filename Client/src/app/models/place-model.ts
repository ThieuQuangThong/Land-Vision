import { PositionModel } from "./position-model";

export class PlaceModel {
  place:google.maps.places.PlaceResult | undefined ;
  distance: number = 0;
  goTime: number = 0;
  position?: PositionModel = new PositionModel();

}
