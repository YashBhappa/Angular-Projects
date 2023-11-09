import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchFormComponent } from './shared/components/search-form/search-form.component';
import { FlightsListComponent } from './flights/components/flights-list/flights-list.component';
import { FlightsPageComponent } from './flights/pages/flights/flights-page/flights-page.component';
import { BookmarksComponent } from './flights/pages/bookmarks/bookmarks.component';
import { SynthesisComponent } from './flights/pages/flights/synthesis/synthesis.component';
import { FlightsDetailsComponent } from './flights/pages/flights/flights-details/flights-details.component';
import { InflightServicesComponent } from './flights/components/inflight-services/inflight-services.component';
import { AuthentificationComponent } from './authentification/authentification/authentification.component';
import { LoginComponent } from './authentification/authentification/login/login.component';
import { RegistrationComponent } from './authentification/authentification/registration/registration.component';
import { AuthentificationGuard } from './authentification/authentification/guards/authentification.guard';
import { FlightsGuard } from './flights/guards/flights.guard';
import { ExceptionComponent } from './exceptions/exception/exception.component';
import { PageNotFoundComponent } from './exceptions/page-not-found/page-not-found.component';
import { ConfirmRegistrationComponent } from './authentification/authentification/confirm-registration/confirm-registration.component';
import { ForgotPasswordComponent } from './authentification/authentification/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './authentification/authentification/reset-password/reset-password.component';


const routes: Routes = [
  {
    path: 'authentification', component: AuthentificationComponent,canActivate: [AuthentificationGuard],
    children: [
      { path: 'login', component: LoginComponent },  
      { path: 'register', component: RegistrationComponent },
      { path: 'registration-confirm', component: ConfirmRegistrationComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: 'reset-password', component: ResetPasswordComponent },
    ]
  },
  {
    path: 'myFlightApp',
    loadChildren: './flights/flights.module#FlightsModule',
    canActivate: [FlightsGuard],
    canLoad: [FlightsGuard]
  },
  { path: 'exception', component: ExceptionComponent},
  { path: '', redirectTo: 'myFlightApp/flights', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({  
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
  