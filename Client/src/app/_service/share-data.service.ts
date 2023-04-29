import { Injectable } from '@angular/core';
import { PositionModel } from '../models/position-model';
import { BehaviorSubject, Observable } from 'rxjs';
import { PlaceModel } from '../models/place-model';
import { PopupTemplate } from '../models/popupTemplate';
import { PopUpObject } from '../models/popUpObject';
import { Attributes } from '../models/attributes';

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

  setRelativePlaces(placeModels :PlaceModel[]){
    const positions: PositionModel[] = placeModels.map(x => {
      const position: PositionModel = {
        place : x.place,
        latitude : x.position?.latitude!,
        longtitude: x.position?.longtitude!
      }
      return position;
    })


    return this.relavetivePlace.next(positions);
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

  setPopUpObject(description: string ="", title:string = "{Name}",content:string ="{Description}") : PopUpObject{
    const popupTemplatePoint: PopupTemplate = {
      title: title,
      content: content
   }
   const attributePoint: Attributes = {
      Description: description
   }

   const result: PopUpObject = {
    PopupTemplate:popupTemplatePoint,
    Attributes: attributePoint
   }
   return  result;
  }
  constructor() { }
}
