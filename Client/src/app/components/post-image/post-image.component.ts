import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-post-image',
  templateUrl: './post-image.component.html',
  styleUrls: ['./post-image.component.css']
})
export class PostImageComponent implements  OnInit {

  @Input() isPost: boolean = false;
  currentImagePos: number = 0;
  currentDragImage: number = 0;
  startDragPos: number = 0;
  distanNumber: number = 0;
  distanceString: string = '0px';
  limitDrag: number = 0;

  widthListImage: number = 0;
  widthContain: number = 0;

  images: string[] =['https://file4.batdongsan.com.vn/resize/1275x717/2023/04/18/20230418145607-b8ca_wm.jpg',
                    'https://file4.batdongsan.com.vn/resize/1275x717/2023/04/18/20230418145607-d122_wm.jpg',
                    'https://file4.batdongsan.com.vn/resize/1275x717/2023/04/18/20230418145607-bb04_wm.jpg',
                    'https://file4.batdongsan.com.vn/resize/1275x717/2023/04/18/20230418145607-a97d_wm.jpg',
                    'https://file4.batdongsan.com.vn/resize/1275x717/2023/04/18/20230418145607-b8ca_wm.jpg',
                    'https://file4.batdongsan.com.vn/resize/1275x717/2023/04/18/20230418145607-d122_wm.jpg',
                    'https://file4.batdongsan.com.vn/resize/1275x717/2023/04/18/20230418145607-bb04_wm.jpg',
                    'https://file4.batdongsan.com.vn/resize/1275x717/2023/04/18/20230418145607-a97d_wm.jpg']

  constructor(private _elementRef : ElementRef) {


  }
  ngOnInit(): void {}
  ngAfterViewInit(): void {
    this.widthListImage =  this._elementRef.nativeElement.querySelector('#imageThumnails').offsetWidth;
    this.widthContain =  this._elementRef.nativeElement.querySelector('#imageThumnailContain').offsetWidth;

    this.limitDrag = this.widthListImage - this.widthContain;
  }

  previousImage(){
    if(this.currentImagePos - 1 < 0){
      this.currentImagePos = this.images.length - 1;
      this.distanNumber = -(this.limitDrag+100)
      this.distanceString = (this.distanNumber).toString() + 'px';
    }
    else{
      this.currentImagePos -= 1;
    }
    const widthOfCurrentImagePos = (this.currentImagePos+1) * 110;
    if(widthOfCurrentImagePos + this.distanNumber  < this.widthContain ){
      if(this.distanNumber + 100 >= 0){
        this.distanNumber = 0
        this.distanceString = (this.distanNumber).toString() + 'px';
        return
      }
      this.distanceString = (this.distanNumber +100).toString() + 'px';
      this.distanNumber += 100;
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

    const widthOfCurrentImagePos = (this.currentImagePos+1) * 110;
    if(widthOfCurrentImagePos + this.distanNumber  > this.widthContain ){
      if(this.distanNumber - 100 <= -this.limitDrag){
        this.distanNumber = -this.limitDrag
        this.distanceString = (this.distanNumber).toString() + 'px';
        return
      }
      this.distanceString = (this.distanNumber -100).toString() + 'px';
      this.distanNumber -= 100;
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
