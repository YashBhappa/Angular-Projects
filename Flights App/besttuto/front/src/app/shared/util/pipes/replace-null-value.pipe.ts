import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replaceNullValue'
})
export class ReplaceNullValuePipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): any {
    return ((value === null) ? '-' : value);
  }

}
