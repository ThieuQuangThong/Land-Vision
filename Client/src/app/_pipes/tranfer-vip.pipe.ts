import { Pipe, PipeTransform } from '@angular/core';
import { PROPERTY_INFOR } from 'src/assets/common/propertyInfor';

@Pipe({
  name: 'tranferVip'
})
export class TranferVipPipe implements PipeTransform {

  transform(value: number): string {
    return PROPERTY_INFOR.VipName[value];
  }

}
