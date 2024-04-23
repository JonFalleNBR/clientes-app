import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptorFn, HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor{

  constructor(){

  }

  intercept(request: HttpRequest<unknown>, next : HttpHandler){

    const tokenString = localStorage.getItem('access_token');

    if(tokenString){
      const token = JSON.parse(tokenString);
      const jwt = token.access_token;
      request = request.clone({
        setHeaders : {
          Authorization: 'Bearer ' + jwt
        }
      })

    }
    return next.handle(request);
  }

}

//export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
//  return next(req);
//};
