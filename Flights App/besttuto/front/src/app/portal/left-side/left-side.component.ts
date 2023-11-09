import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/authentification/authentification/services/authentification.service';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-left-side',
  templateUrl: './left-side.component.html',
  styleUrls: ['./left-side.component.css']
})
export class LeftSideComponent implements OnInit {
  language: FormGroup;
  langs: Array<string>;
  constructor(private readonly translateService: TranslateService, private fb: FormBuilder, private readonly sharedService: SharedService
    , private readonly router: Router, private authService: AuthentificationService) {
    translateService.addLangs(['en_US', 'fr_FR']);
  }

  ngOnInit(): void {
    this.langs = this.translateService.getLangs();
    this.language = this.fb.group({
      language: [null]
    });
    const toSelect = this.langs.find(c => c == localStorage.getItem('language'));
    if (!isNullOrUndefined(toSelect)) {
      this.language.get('language').setValue(toSelect);
    }
    else {
      this.language.get('language').setValue('en_US');
    }
  }
  changeLang(language: string) {
    localStorage.setItem('language', language);
    this.translateService.use(language);
    //language = en_US or fr_FR
    this.sharedService.selectedLanguage.next(language.substring(0, 2));
  }
  bookmarksPage() {
    this.router.navigate(['/myFlightApp/bookmarks']);
  }
  flightsPage() {
    this.router.navigate(['/myFlightApp/flights']);
  }
  synthesisPage() {
    this.router.navigate(['/myFlightApp/synthesis']);
  }
  logOut() {
    this.authService.removeTokens();
    this.router.navigate(['/authentification/login']);
  }
}
