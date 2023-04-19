import { Pipe, PipeTransform } from '@angular/core';
import { PROPERTY_INFOR } from 'src/assets/common/propertyInfor';

@Pipe({
  name: 'interiorTransform'
})
export class InteriorTransformPipe implements PipeTransform {

  transform(value: number): string {
    return PROPERTY_INFOR.Interior[value];
  }

}
