import { Injectable } from '@angular/core';
import { Cliente } from './clientes/cliente';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ClientesService {


  apiURL: string = environment.apiURLBase + '/api/clientes';

  constructor(private http: HttpClient) { }

  salvar(cliente: Cliente): Observable<Cliente> {
    const token = JSON.parse(localStorage.getItem('access_token') || '{}')
    const headers = {
      'Authorization' : 'Bearer ' + token.access_token
    }

    return this.http.post<Cliente>(`${this.apiURL}`, cliente, {headers})
  }

  atualizar(cliente: Cliente): Observable<any> { // Any pois o Back-end é um metodo VOID que não retorna nada
    const token = JSON.parse(localStorage.getItem('access_token') || '{}')
    const headers = {
      'Authorization' : 'Bearer ' + token.access_token
    }


    return this.http.put<Cliente>(`${this.apiURL}/${cliente.id}`, cliente, {headers})
  }

  deletar(cliente: Cliente): Observable<any>{

    const token = JSON.parse(localStorage.getItem('access_token') || '{}')
    const headers = {
      'Authorization' : 'Bearer ' + token.access_token
    }

    return this.http.delete<any>(`${this.apiURL}/${cliente.id}`, {headers})
  }


  getClientes(): Observable<Cliente[]> {
        //const tokenString = localStorage.getItem('access_token')
        const token = JSON.parse(localStorage.getItem('access_token') || '{}')
        const headers = {
          'Authorization' : 'Bearer ' + token.access_token
        }

    return this.http.get<Cliente[]>(this.apiURL, {headers})
  }

  getClientebyId(id: number): Observable<Cliente> {
    const token = JSON.parse(localStorage.getItem('access_token') || '{}')
        const headers = {
          'Authorization' : 'Bearer ' + token.access_token
        }
    return this.http.get<Cliente>(`${this.apiURL}/${id}`, {headers}) //uso da crase no lugar da aspas simples possibilita trasnformar o link em uma string, e habilitando a inserção de expressões 
  }

}
