import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'moneyTransform'
})
export class MoneyTranformPipe implements PipeTransform {

  transform(value: number): string {
    const billion = 1000000000;
    const million = 1000000;
    const nganDong = 1000;
    if (value >= billion) {
      return (value / billion).toFixed(2) + ' Tỷ';
    } else if (value >= million) {
      return (value / million).toFixed(2) + ' Triệu';
    } else if (value >= nganDong) {
      return (value / nganDong).toFixed(3) + 'đ';
    }
     else {
      return value.toString() + 'đ';
    }
  }

}
