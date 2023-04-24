import { Injectable } from '@angular/core';
import { PositionModel } from '../models/position-model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {

  imageSlides : BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  positionPosts: BehaviorSubject<PositionModel[]> = new BehaviorSubject<PositionModel[]>([]);

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
  constructor() { }
}
