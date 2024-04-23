import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree  } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Routes } from '@angular/router';


@Injectable({
  providedIn:'root'
})

export class AuthGuard implements CanActivate{

  constructor(
      private authService : AuthService
      //private routes: Routes
  ){}

  canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): boolean {

        return this.authService.isAuthenticated();
   // const authenticated =  this.authService.isAuthenticated(); 


  }
}
