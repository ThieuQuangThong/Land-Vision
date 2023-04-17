import { Pipe, PipeTransform } from '@angular/core';
import { PROPERTY_INFOR } from 'src/assets/common/propertyInfor';

@Pipe({
  name: 'juridicalTransform'
})
export class JuridicalTransformPipe implements PipeTransform {

  transform(value: number): string {
    return PROPERTY_INFOR.juridicals[value];
  }

}
