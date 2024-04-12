import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServicoPrestado } from './servico-prestado/servicoPrestado';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { ServicoPrestadoBusca } from './servico-prestado/servico-prestado-lista/servicoPrestadoBusca';
import { url } from 'inspector';

@Injectable({
  providedIn: 'root'
})
export class ServicoPrestadoService {

  apiURL: string = environment.apiURLBase + '/api/servicos-prestados';

  constructor(private http : HttpClient) {}

    salvar(servicoPrestado: ServicoPrestado) : Observable<ServicoPrestado>{
      return this.http.post<ServicoPrestado>(`${this.apiURL}`, servicoPrestado);
    }
  

    buscar(nome: string, mes: number): Observable<ServicoPrestadoBusca[]>{

        const httpParams = new HttpParams().set("nome" , nome)
                                           .set("mes", mes ? mes.toString(): ' '); // caso ternario - passar a string mes, caso que ela n exista, passe uma string vazia
     
        const url = this.apiURL + "?" + httpParams.toString();
        return this.http.get<any>(url)

    }
}

//Conexão com a API Back End, parte importante da aplicação que fala com o Back, que esta conectado ao Banco de Dados
