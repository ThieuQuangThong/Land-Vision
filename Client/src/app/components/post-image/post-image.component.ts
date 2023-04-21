import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AlertService } from 'src/app/_service/alert.service';
import { FileUploadService } from 'src/app/_service/file-upload.service';

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

  images: string[] =[]

  constructor(private _elementRef : ElementRef, private fileService: FileUploadService) {


  }
  ngOnInit(): void {
    if(this.isPost === false ){
      this.images = ['https://file4.batdongsan.com.vn/resize/1275x717/2023/04/18/20230418145607-b8ca_wm.jpg',
      'https://file4.batdongsan.com.vn/resize/1275x717/2023/04/18/20230418145607-d122_wm.jpg',
      'https://file4.batdongsan.com.vn/resize/1275x717/2023/04/18/20230418145607-bb04_wm.jpg',
      'https://file4.batdongsan.com.vn/resize/1275x717/2023/04/18/20230418145607-a97d_wm.jpg',
      'https://file4.batdongsan.com.vn/resize/1275x717/2023/04/18/20230418145607-b8ca_wm.jpg',
      'https://file4.batdongsan.com.vn/resize/1275x717/2023/04/18/20230418145607-d122_wm.jpg',
      'https://file4.batdongsan.com.vn/resize/1275x717/2023/04/18/20230418145607-bb04_wm.jpg',
      'https://file4.batdongsan.com.vn/resize/1275x717/2023/04/18/20230418145607-a97d_wm.jpg']
    }
  }
  ngAfterViewInit(): void {
    this.widthListImage =  this._elementRef.nativeElement.querySelector('#imageThumnails').offsetWidth;
    this.widthContain =  this._elementRef.nativeElement.querySelector('#imageThumnailContain').offsetWidth;

    this.limitDrag = this.widthListImage - this.widthContain;
  }
  addImage(e: any){
  this.isImageLoading = true;
  this.fileService.convertFileToUrl(e.target.files[0])
                .subscribe(
                  img =>{
                    this.isImageLoading = false;
                    this.images.unshift(img);
                  },
                  erorr =>{
                    this.isImageLoading = false;
                    AlertService.setAlertModel('danger','Some thing went wrong')
                  }
                );
  }
  previousImage(){
    if(this.currentImagePos - 1 < 0){
      this.currentImagePos = this.images.length - 1;
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
    this.images.splice(i,1);
  }

  afterImage(){
    if(this.currentImagePos+1 > this.images.length-1){
      this.currentImagePos = 0;
      this.distanNumber = 0
      this.distanceString = (this.distanNumber).toString() + 'px';
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

    const x = Number(e.clientX);


    if(x === 0){
      return;
    }
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
