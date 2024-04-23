import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from './login/usuario';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment'

import { JwtHelperService} from '@auth0/angular-jwt'

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  apiUrl : string = environment.apiURLBase + '/api/usuarios'
  tokenUrl: string = environment.apiURLBase + environment.obterTokenUrl
  clientID: string = environment.clientId
  clientSecret: string = environment.clientSecret;
  jwtHelper : JwtHelperService = new JwtHelperService();

  constructor(
    private http : HttpClient
  ) { }


  obterToken(){
    const tokenString = localStorage.getItem('access_token')
    if(tokenString){
      const token = JSON.parse(tokenString).access_token
      return token;
    }
    return null;
  }





  salvar(usuario: Usuario): Observable<any>{
    return this.http.post<Usuario>(`${this.apiUrl}`, usuario)
  }

  
  isAuthenticated() : boolean {
    const token = this.obterToken();
    if(token){
      const expirated = this.jwtHelper.isTokenExpired(token);
      return !expirated;
    }
    return false;
    /*logica importante pois verifica a autenticação via token para acessar a  home e demais urls da aplicação que exijam autenticação
        verificar classes auth.guard.ts e app-routing-module
    */
  }


  tentarLogar(username: string, password: string): Observable<any>{
        const params = new HttpParams()
                  .set('username', username)
                  .set('password', password)
                  .set('grant_type', 'password')

        const headers = {
          'Authorization': 'Basic ' + btoa(`${this.clientID}:${this.clientSecret}`), 
          'Content-Type': 'application/x-www-form-urlencoded'
          }
        return this.http.post(this.tokenUrl, params.toString(), { headers });
  }


}
