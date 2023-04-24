import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'distanceTransfer'
})
export class DistanceTransferPipe implements PipeTransform {

  transform(value: number): string {
      if(value < 1){
        return (value*1000).toString() + ' m';
      }
      return value.toString() + ' km';
  }

}
