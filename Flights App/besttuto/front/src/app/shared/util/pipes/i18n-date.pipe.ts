import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'i18nDate'
})
export class I18nDatePipe implements PipeTransform {
  constructor(private readonly translateService: TranslateService) {}

  transform(value: any, ...args: unknown[]): any {
    const ngPipe=new DatePipe(this.translateService.currentLang);
    return ngPipe.transform(value);
  }

}
