import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthentificationComponent } from './authentification/authentification.component';
import { LoginComponent } from './authentification/login/login.component';
import { RegistrationComponent } from './authentification/registration/registration.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { PortalModule } from '../portal/portal.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthentificationInterceptor } from './authentification/authentification.interceptor';
import { TranslateModule } from '@ngx-translate/core';
import { ConfirmRegistrationComponent } from './authentification/confirm-registration/confirm-registration.component';
import { ForgotPasswordComponent } from './authentification/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './authentification/reset-password/reset-password.component';



@NgModule({
  declarations: [AuthentificationComponent, LoginComponent, RegistrationComponent, ConfirmRegistrationComponent, ForgotPasswordComponent, ResetPasswordComponent],
  imports: [
    CommonModule,
    MatCardModule,   
    MatFormFieldModule,  
    RouterModule,
    MatButtonModule,
    MatInputModule,
    PortalModule,
    MatToolbarModule,   
    MatIconModule,
    FormsModule, ReactiveFormsModule,
    TranslateModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthentificationInterceptor,
      multi: true
    }
  ]
})
export class AuthentificationModule { }
                     