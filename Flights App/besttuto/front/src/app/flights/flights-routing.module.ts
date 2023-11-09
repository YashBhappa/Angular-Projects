import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FlightsPageComponent } from './pages/flights/flights-page/flights-page.component';
import { BookmarksComponent } from './pages/bookmarks/bookmarks.component';
import { SynthesisComponent } from './pages/flights/synthesis/synthesis.component';
import { FlightsDetailsComponent } from './pages/flights/flights-details/flights-details.component';
import { InflightServicesComponent } from './components/inflight-services/inflight-services.component';

const routes: Routes = [
  { path: 'flights', component: FlightsPageComponent },
  {
    path: 'bookmarks',
    component: BookmarksComponent
  },
  {
    path: 'synthesis',
    component: SynthesisComponent, data : {title : 'Synthesis'}
  },  
  {
    path: 'details',
    component: FlightsDetailsComponent
  },
  {
    path: 'details/services',
    component: InflightServicesComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class FlightsRoutingModule { }
