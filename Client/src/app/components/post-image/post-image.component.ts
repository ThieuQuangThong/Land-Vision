import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { AlertService } from 'src/app/_service/alert.service';
import { FileUploadService } from 'src/app/_service/file-upload.service';
import { ShareDataService } from 'src/app/_service/share-data.service';

@Component({
  selector: 'app-post-image',
  templateUrl: './post-image.component.html',
  styleUrls: ['./post-image.component.css']
})
export class PostImageComponent implements  OnInit {

  @Input() isPost: boolean = false;
  isImageLoading: boolean = false;
  currentImagePos: number = 0;
  currentDragImage: number = 0;
  startDragPos: number = 0;
  distanNumber: number = 0;
  distanceString: string = '0px';
  limitDrag: number = 0;

  widthListImage: number = 0;
  widthContain: number = 0;


  constructor(public shareInfor: ShareDataService ,private _elementRef : ElementRef, private fileService: FileUploadService) {}

  ngOnInit(): void {
    this.shareInfor.setImageSlideValue([]);

  }

  ngAfterViewInit(): void {
    this.setLimitDrag();

  }

  setLimitDrag(){
    this.shareInfor.getImageSlideValueAsTracking()
    .subscribe(
      respone =>{
        this.widthContain =  this._elementRef.nativeElement.querySelector('#imageThumnailContain').offsetWidth;
        this.widthListImage =  respone.length*120 +10;
        if(this.widthListImage > this.widthContain){
          this.limitDrag = this.widthListImage - this.widthContain ;
          return;
        }
        this.limitDrag = 0;
      }
    )
  }

  addImage(e: any){
  this.isImageLoading = true;
  this.fileService.convertFileToUrl(e.target.files[0])
                .subscribe(
                  img =>{
                    this.isImageLoading = false;
                    this.setLimitDrag();
                    this.shareInfor.addImageToSlide(img);
                  },
                  erorr =>{
                    this.isImageLoading = false;
                    AlertService.setAlertModel('danger','Some thing went wrong')
                  }
                );
  }

  previousImage(){
    this.setLimitDrag();
    if(this.currentImagePos - 1 < 0){
      this.currentImagePos = this.shareInfor.getImageSlideValue().length - 1;
      this.distanNumber = -(this.limitDrag+110)
      this.distanceString = (this.distanNumber).toString() + 'px';
    }
    else{
      this.currentImagePos -= 1;
    }
    const widthOfCurrentImagePos = (this.currentImagePos+1) * 120;
    if(widthOfCurrentImagePos + this.distanNumber  < this.widthContain ){
      if(this.distanNumber + 110 >= 0){
        this.distanNumber = 0
        this.distanceString = (this.distanNumber).toString() + 'px';
        return
      }
      this.distanceString = (this.distanNumber +110).toString() + 'px';
      this.distanNumber += 110;
    }
  }

  deleteImage(i: number){
    this.currentImagePos = 0;
    this.shareInfor.deleteImageByPos(i);
    this.distanNumber = 0;
    this.distanceString = (this.distanNumber).toString() + 'px';
    this.setLimitDrag();
  }

  afterImage(){
    this.setLimitDrag();
    if(this.currentImagePos+1 > this.shareInfor.getImageSlideValue().length-1){
      this.currentImagePos = 0;
      this.distanNumber = 0
      this.distanceString = (this.distanNumber).toString() + 'px';
      return;
    }
    else {
      this.currentImagePos += 1;
    }

    const widthOfCurrentImagePos = (this.currentImagePos+1) * 120;
    if(widthOfCurrentImagePos + this.distanNumber  > this.widthContain ){
      if(this.distanNumber - 110 <= -this.limitDrag){
        this.distanNumber = -this.limitDrag
        this.distanceString = (this.distanNumber).toString() + 'px';
        return
      }
      this.distanceString = (this.distanNumber -110).toString() + 'px';
      this.distanNumber -= 110;
    }
  }


  moveImages(e: any){
    console.log(-this.limitDrag);

    const movedDistance = this.startDragPos - Number(e.clientX);
    const leftPos =  this.distanNumber - movedDistance;
    if(leftPos <= -this.limitDrag ||  leftPos > 0){
        return;
    }
    this.distanceString = leftPos.toString() + 'px';
  }

  endDrag(e:any){
    this.distanNumber =Number(this.distanceString.replace('px',''));

  }
  getFirstPos(e:any){
    this.startDragPos = Number(e.clientX);

}
  chooseImage(pos: number){

    this.currentImagePos = pos;

  }

}
