import { Injectable } from '@angular/core';
import { LoginResponse } from 'src/app/shared/models/login-response.model';
import { LoginRequest } from 'src/app/shared/models/login-request.model';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap, mapTo, catchError, map } from 'rxjs/operators';
import { User } from 'src/app/shared/models/user.model';
import { environment } from 'src/environments/environment';
import { PasswordReset } from 'src/app/shared/models/password-reset.model';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  readonly API_URL = environment.apiUrl;
  constructor(private http: HttpClient) { }

  storeTokens(loginResponse: LoginResponse) {
    localStorage.setItem(this.JWT_TOKEN, loginResponse.token);
  }

  removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }

  login(loginRequest: LoginRequest): Observable<boolean> {
    return this.http.post<LoginResponse>(this.API_URL+'/authenticate', loginRequest).
      pipe(
        tap(loginResponse => this.storeTokens(loginResponse)
        ),
        mapTo(true),
        catchError(error => {
          return of(false);
        })
      );
  }

  register(user: User) {
    return this.http.post(this.API_URL+'/register', user);
  }

  confirmRegistration(token: string) {
    return this.http.get(this.API_URL+'/registration-confirm?token=' + token).pipe(map((result:LoginResponse) => result.token));
  }
  
  resetPassword(password:PasswordReset){
    return this.http.post(`${environment.apiUrl}/reset`, password).pipe(map((res:LoginResponse) => res.token));
  }

  forgotPassword(email: String) {
    return this.http.post(this.API_URL + '/forgotPassword', email).pipe(map((res:LoginResponse) => res.token));
  }

}
