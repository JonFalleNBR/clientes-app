import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router  } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Routes } from '@angular/router';


@Injectable({
  providedIn:'root'
})

export class AuthGuard implements CanActivate{

  constructor(
      private authService : AuthService,
      private router: Router
  ){}

  canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): boolean {

        //return this.authService.isAuthenticated();
        const authenticated =  this.authService.isAuthenticated(); 

        if(authenticated){
          return true;
        }else{
          this.router.navigate(['/login'])
          return false
        }

  }
}
