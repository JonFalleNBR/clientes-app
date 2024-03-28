import { Injectable } from '@angular/core';
import { Cliente } from './clientes/cliente';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private http: HttpClient) { }

  salvar(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>('http://localhost:8082/api/clientes', cliente)
  }

  atualizar(cliente: Cliente): Observable<any> { // Any pois o Back-end é um metodo VOID que não retorna nada
    return this.http.put<Cliente>(`http://localhost:8082/api/clientes/${cliente.id}`, cliente)
  }

  deletar(cliente: Cliente): Observable<any>{
    return this.http.delete<any>(`http://localhost:8082/api/clientes/${cliente.id}`)
  }


  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>('http://localhost:8082/api/clientes')
  }

  getClientebyId(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`http://localhost:8082/api/clientes/${id}`) //uso da crase no lugar da aspas simples possibilita trasnformar o link em uma string, e habilitando a inserção de expressões 
  }

}
