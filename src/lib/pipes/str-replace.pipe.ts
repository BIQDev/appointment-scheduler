import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'biqStrReplace'
})
export class StrReplacePipe implements PipeTransform {

  transform(src: string, search: string, replace: string): string {
    let re = new RegExp(search, 'ig');
    return src.replace( re, replace );
  }

}
