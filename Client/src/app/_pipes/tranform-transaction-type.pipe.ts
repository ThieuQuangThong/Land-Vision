import { Pipe, PipeTransform } from '@angular/core';
import { PROPERTY_INFOR } from 'src/assets/common/propertyInfor';

@Pipe({
  name: 'tranformTransactionType'
})
export class TranformTransactionTypePipe implements PipeTransform {

  transform(value: number): string {
    return PROPERTY_INFOR.TransactionTypes[value];
  }

}
