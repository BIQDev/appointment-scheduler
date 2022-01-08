import { Pipe, PipeTransform } from '@angular/core';
import {biqHelper} from '@biqdev/ng-helper';
import * as moment_ from 'moment';

const moment = moment_;

@Pipe({
  name: 'biqMoment'
})
export class BiqMomentPipe implements PipeTransform {

  transform(value: any, formatOutput?: string, formatInput?: string, empty?: any): any {

    empty = biqHelper.isNull( empty ) ? '' : empty;

    if ( biqHelper.isNull(value) ) {
      return empty;
    }

    let argsMoment = [value];
    if ( !biqHelper.isNull(formatInput) ) {
      argsMoment.push(formatInput);
    }

    return moment( ...argsMoment ).format( formatOutput );
  }

}
