import { Injectable } from '@angular/core';
import { Cliente } from './clientes/cliente';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private http : HttpClient) {}

   salvar(cliente: Cliente) : Observable<Cliente> {
      return this.http.post<Cliente>('http://localhost:8082/api/clientes', cliente)
   }
  getClientes(): Observable<Cliente[]>{
   return this.http.get<Cliente[]>('http://localhost:8082/api/clientes')
  }
  


}
