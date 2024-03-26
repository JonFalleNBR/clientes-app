import { Injectable } from '@angular/core';
import { Cliente } from './clientes/cliente';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private http : HttpClient) {


   }

   salvar(cliente: Cliente) : Observable<Cliente> {
      return this.http.post<Cliente>('http://localhost:8082/api/clientes', cliente)
   }

  getCliente(): Cliente {
    let cliente : Cliente = new Cliente(); 
    cliente.nome = 'Fulano de Tal'; 
    cliente.cpf = '888888';
    return cliente;
  }
}
