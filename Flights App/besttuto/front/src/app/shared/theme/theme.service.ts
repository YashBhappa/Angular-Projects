import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Theme } from '../models/theme.model';

export const defaultTheme = {
  firstColor: '#3f51b5',
  secondColor: '#336EFF',
  thirdColor: '#B2CDD7',
  fourthColor: '#EAF9FF'
};

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(@Inject(DOCUMENT) private readonly document) { }

  setDefaultTheme() {
    this.setThemesCss(defaultTheme);
  }

  public setThemesCss(theme: Theme) {
    Object.keys(theme).forEach(k =>
      document.documentElement.style.setProperty(`--${k}`, theme[k])
    );
  }
}
