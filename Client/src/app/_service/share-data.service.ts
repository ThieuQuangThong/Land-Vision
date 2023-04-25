import { Injectable } from '@angular/core';
import { PositionModel } from '../models/position-model';
import { BehaviorSubject, Observable } from 'rxjs';
import { PlaceModel } from '../models/place-model';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {

  imageSlides: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  positionPosts: BehaviorSubject<PositionModel[]> = new BehaviorSubject<PositionModel[]>([]);
  relavetivePlace: BehaviorSubject<PositionModel[]> = new BehaviorSubject<PositionModel[]>([]);

  getRelativePlaceAsTracking(): Observable<PositionModel[]>{
    return this.relavetivePlace.asObservable();
  }

  getRelativePlaces():PositionModel[]{
    return this.relavetivePlace.getValue();
  }

  setRelativePlaces(placeModels :PlaceModel[],i :number){
    const positions: PositionModel[] = placeModels.map(x => {
      const position: PositionModel = {
        latitude : x.position?.latitude!,
        longtitude: x.position?.longtitude!
      }
      return position;
    })
    let test :PositionModel[]=[

    ]
    if(i === 1){
      test = [      {
        latitude:'16.031994234986524',
        longtitude: '108.21074802514354'
      },
      {
        latitude:'16.040445525056004',
        longtitude: '108.21171969703994'
      }]
    }
    else{
      test= [
        {
          latitude:'16.040445525056004',
          longtitude: '108.21171969703994'
        }
      ]
    }
    console.log(test);

    return this.relavetivePlace.next(test);
  }

  getPositionPostAsTracking(): Observable<PositionModel[]>{
      return this.positionPosts.asObservable();
  }

  setPositionPost(positions :PositionModel[]){
    this.positionPosts.next(positions);
  }

  getPositionsValue():PositionModel[]{
    return this.positionPosts.getValue();
  }

  getImageSlideValue(): string[]{
    return this.imageSlides.getValue();
  }

  getImageSlideValueAsTracking(): Observable<string[]>{
    return this.imageSlides.asObservable();
  }

  setImageSlideValue(value: string[]){
    this.imageSlides.next(value);
  }

  addImageToSlide(value: string){
    const currentImages = this.getImageSlideValue();
    currentImages.unshift(value);
    this.setImageSlideValue(currentImages);
  }

  deleteImageByPos(pos: number){
    const currentImages = this.getImageSlideValue();
    currentImages.splice(pos,1);
    this.setImageSlideValue(currentImages);
  }

  tranferToArsgisPos(respone: PositionModel[]): number[][]{
    const positionArray: number[][] = [];
    respone.forEach(
      x => {
        const {latitude, longtitude} = x;
        positionArray.push([Number(longtitude), Number(latitude)]);
      }
    )
    return positionArray;
  }
  constructor() { }
}
