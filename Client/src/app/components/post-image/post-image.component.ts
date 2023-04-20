import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-post-image',
  templateUrl: './post-image.component.html',
  styleUrls: ['./post-image.component.css']
})
export class PostImageComponent implements  OnInit {

  currentImagePos: number = 0;
  currentDragImage: number = 0;
  startDragPos: number = 0;
  distanNumber: number = 0;
  distanceString: string = '0px';

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
    const widthListImage =  this._elementRef.nativeElement.querySelector('#imageThumnails').offsetWidth;
    const widthContain =  this._elementRef.nativeElement.querySelector('#imageThumnailContain').offsetWidth;
  }

  previousImage(){
    if(this.currentImagePos - 1 < 0){
      this.currentImagePos = this.images.length - 1;
    }
    else{
      this.currentImagePos -= 1;
    }
      this.currentImagePos -= 1;
  }

  afterImage(){
    if(this.currentImagePos+1 > this.images.length-1){
      this.currentImagePos = 0;
      return;
    }

    this.currentImagePos += 1;
  }
  moveImages(e: any){
    const x = Number(e.clientX);
    if(x === 0){
      return;
    }
    const movedDistance = this.startDragPos - Number(e.clientX);
    this.distanceString = (this.distanNumber - movedDistance).toString() + 'px';


    // this.distanceString =  this.distanNumber.toString() + 'px';


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
