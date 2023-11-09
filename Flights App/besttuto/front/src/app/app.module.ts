import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID} from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlightsModule } from './flights/flights.module';
import { LangService } from './shared/lang/services/lang.service';
import { CustomTranslateLoader } from './shared/lang/custom-translate-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { AuthentificationModule } from './authentification/authentification.module';
import { ExceptionComponent } from './exceptions/exception/exception.component';
import { MatCardModule } from '@angular/material/card';
import { PageNotFoundComponent } from './exceptions/page-not-found/page-not-found.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    ExceptionComponent,
    PageNotFoundComponent
  ],
  imports: [           
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlightsModule,
    HttpClientModule,
    AuthentificationModule,
    MatCardModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: TranslateLoaderFactory,
        deps: [LangService]
      }
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
  bootstrap: [AppComponent]
})    
export class AppModule { }

export function TranslateLoaderFactory(langService: LangService): CustomTranslateLoader {
  return new CustomTranslateLoader(langService);
}