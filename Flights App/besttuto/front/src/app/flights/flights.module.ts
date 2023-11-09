import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightsComponent } from './pages/flights/flights.component';
import { FlightsListComponent } from './components/flights-list/flights-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { FlightsPageComponent } from './pages/flights/flights-page/flights-page.component';
import { SharedModule } from '../shared/shared.module';
import { PortalModule } from '../portal/portal.module';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FlightSearchSummaryComponent } from './components/flight-search-summary/flight-search-summary.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BookmarksComponent } from './pages/bookmarks/bookmarks.component';
import { BookmarksListComponent } from './pages/bookmarks/bookmarks-list/bookmarks-list.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SynthesisComponent } from './pages/flights/synthesis/synthesis.component';
import { SynthesisCriteriaComponent } from './pages/flights/synthesis/synthesis-criteria/synthesis-criteria.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { SynthesisFlightsComponent } from './pages/flights/synthesis/synthesis-flights/synthesis-flights.component';
import { SynthesisCompanyComponent } from './pages/flights/synthesis/synthesis-company/synthesis-company.component';
import { ChartsModule } from 'ng2-charts';
import { SynthesisTripComponent } from './pages/flights/synthesis/synthesis-trip/synthesis-trip.component';
import { FlightsDetailsComponent } from './pages/flights/flights-details/flights-details.component';
import { FlightInfosComponent } from './components/flight-infos/flight-infos.component';
import { CabinDetailsComponent } from './components/cabin-details/cabin-details.component';
import { ActionPartComponent } from './components/action-part/action-part.component';
import { InflightServicesComponent } from './components/inflight-services/inflight-services.component';
import { MatCardModule } from '@angular/material/card';
import { ElevationDirective } from '../shared/util/directives/elevation.directive';
import { FlightsRoutingModule } from './flights-routing.module';

@NgModule({
  declarations: [FlightsComponent, FlightsListComponent, FlightsPageComponent, FlightSearchSummaryComponent, BookmarksComponent, BookmarksListComponent, SynthesisComponent, SynthesisCriteriaComponent, SynthesisFlightsComponent, SynthesisCompanyComponent, SynthesisTripComponent, FlightsDetailsComponent,
     FlightInfosComponent, CabinDetailsComponent, ActionPartComponent, InflightServicesComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatSortModule,
    SharedModule,
    PortalModule,
    MatIconModule,
    TranslateModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatTableExporterModule,
    MatDialogModule,
    FormsModule, ReactiveFormsModule,
    MatInputModule,
    MatSnackBarModule,
    MatDatepickerModule,
    ChartsModule,
    MatCardModule,
    FlightsRoutingModule    
  ],
  providers: [],
  exports: [FlightsListComponent]
})
export class FlightsModule { }
