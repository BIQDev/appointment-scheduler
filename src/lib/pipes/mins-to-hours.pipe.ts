import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'biqMinsToHours'
})
export class BiqMinsToHoursPipe implements PipeTransform {

  transform(value: number): string {
    let hours:number = value / 60 | 0;
    let mins:number = value % 60 | 0;

    let hoursStr: string = hours === 0 ? '' : `${hours} Hour`;
    let minsStr: string = mins === 0 ? '' : `${mins} mins`
    return `${hoursStr}${minsStr === '' ? '' : ' ' + minsStr}`;
  }

}
