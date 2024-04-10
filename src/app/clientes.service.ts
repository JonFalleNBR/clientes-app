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
    return this.http.post<Cliente>(`${this.apiURL}`, cliente)
  }

  atualizar(cliente: Cliente): Observable<any> { // Any pois o Back-end é um metodo VOID que não retorna nada
    return this.http.put<Cliente>(`${this.apiURL}/${cliente.id}`, cliente)
  }

  deletar(cliente: Cliente): Observable<any>{
    return this.http.delete<any>(`${this.apiURL}/${cliente.id}`)
  }


  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiURL)
  }

  getClientebyId(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiURL}/${id}`) //uso da crase no lugar da aspas simples possibilita trasnformar o link em uma string, e habilitando a inserção de expressões 
  }

}
