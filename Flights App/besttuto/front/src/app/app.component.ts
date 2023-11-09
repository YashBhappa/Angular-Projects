import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SharedService } from './shared/services/shared.service';
import { DateAdapter } from '@angular/material/core';
import { Theme } from './shared/models/theme.model';
import { ThemeService } from './shared/theme/theme.service';
import { isNullOrUndefined } from 'util';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnDestroy {
  subscriptions: Subscription[] = [];

  constructor(private readonly sharedService: SharedService, private readonly translateService: TranslateService,
    private readonly dateAdapter: DateAdapter<Date>, private readonly themeService: ThemeService) {
    this.subscriptions.push(this.sharedService.selectedLanguage.subscribe(lang => {
      this.dateAdapter.setLocale(lang);
    }));
    const locale = localStorage.getItem('language');
    if (!isNullOrUndefined(locale)) {
      translateService.use(locale);
    }
    else {
      translateService.use('en_US');
    }
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
  ngAfterViewInit(): void {
    this.subscriptions.push(this.sharedService.constractType.subscribe(constract => {
      this.initConstract(constract);
    }));
  }

  loadTheme(firstcolor: string, secondcolor: string, thirdcolor: string, fourthcolor: string) {
    const theme: Theme = new Theme();
    theme.firstColor = firstcolor;
    theme.secondColor = secondcolor;
    theme.thirdColor = thirdcolor;
    theme.fourthColor = fourthcolor;
    this.themeService.setThemesCss(theme);
  }

  private initConstract(constract: string) {
    if (constract === 'high') {
      this.loadTheme('#03257A', '#032E99', '#D3D3D3', '#EEEEEE');
    }
    else if (constract === 'normal') {
      this.loadTheme('#3f51b5', '#336EFF', '#B2CDD7', '#EAF9FF');
    }
    else {
      this.themeService.setDefaultTheme();
    }
  }

}
