import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthentificationService } from './services/authentification.service';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthentificationInterceptor implements HttpInterceptor {

  constructor(private readonly authService: AuthentificationService, private readonly router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.getJwtToken()) {
      request = this.addToken(request, this.authService.getJwtToken());
    }
    return next.handle(request).pipe(
      catchError(err => {
        if (err.status===403) {
          this.router.navigate(['/authentification/login']);
        }
        else if (err.status===500) {
          this.router.navigate(['/authentification/register']);
        }
        else {
          this.router.navigate(['/exception']);
        }
        return throwError(err);
      })
    );
  }   

  addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });
  }
}
