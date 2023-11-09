import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanLoad, Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthentificationService } from 'src/app/authentification/authentification/services/authentification.service';

@Injectable({
  providedIn: 'root'
})
export class FlightsGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthentificationService, private router: Router) { }

  canLoad() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/authentification/login']);
    }
    return this.authService.isLoggedIn();
  }
  canActivate() {
    return this.canLoad();
  }

}
