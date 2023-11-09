import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { I18nDatePipe } from './util/pipes/i18n-date.pipe';
import { ReplaceNullValuePipe } from './util/pipes/replace-null-value.pipe';
import { ElevationDirective } from './util/directives/elevation.directive';

@NgModule({
  declarations: [SearchFormComponent, I18nDatePipe, ReplaceNullValuePipe, ElevationDirective],
  imports: [
    CommonModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMaterialTimepickerModule,
    MatButtonModule,
    FormsModule, ReactiveFormsModule,
    TranslateModule
  ],
  exports: [SearchFormComponent,I18nDatePipe,ReplaceNullValuePipe,ElevationDirective]
})
export class SharedModule { }
    