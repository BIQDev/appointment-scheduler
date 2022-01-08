import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'biqJsonSerialize'
})
export class BiqJsonSerializePipe implements PipeTransform {

  transform(value: Object | Array<any>): string {
    return JSON.stringify(value);
  }

}
