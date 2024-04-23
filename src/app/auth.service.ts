import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from './login/usuario';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment'


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  apiUrl : string = environment.apiURLBase + '/api/usuarios'
  tokenUrl: string = environment.apiURLBase + environment.obterTokenUrl
  clientID: string = environment.clientId
  clientSecret: string = environment.clientSecret

  constructor(
    private http : HttpClient
  ) { }


  salvar(usuario: Usuario): Observable<any>{
    return this.http.post<Usuario>(`${this.apiUrl}`, usuario)
  }

  
  isAuthenticated() : boolean {
    return true;
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
