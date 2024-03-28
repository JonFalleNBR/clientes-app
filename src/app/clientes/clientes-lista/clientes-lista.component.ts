import { Component, OnInit } from '@angular/core';
import {Router } from '@angular/router'

import { Cliente } from '../cliente';
import { ClientesService } from '../../clientes.service';
import { response } from 'express';
import { subscribe } from 'diagnostics_channel';

@Component({
  selector: 'app-clientes-lista',
  templateUrl: './clientes-lista.component.html',
  styleUrl: './clientes-lista.component.css'
})
export class ClientesListaComponent implements OnInit {

  clientes: Cliente[] = [];
  clienteSelecionado!: Cliente; // relacao a operação de exclusão de um cliente da lista 
  mensagemSucesso: String = ''
  mensagemErro: String = ''


  constructor(private service: ClientesService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.service
      .getClientes()
      .subscribe(response =>
        this.clientes = response);
  }
  novoCadastro(){
    this.router.navigate(['/clientes-form'])
  }

  preparaDelecao(cliente: Cliente){
      this.clienteSelecionado = cliente
    //  relacao a operação de exclusão de um cliente da lista
  }

  deletarCliente(){
    this.service
          .deletar(this.clienteSelecionado)
          .subscribe(
                    response => {this.mensagemSucesso = 'Cliente deletado com Sucesso'
                    this.ngOnInit(); //Atualizar a tela assim que a operação de delete for concluida 
                  },
                     erro => this.mensagemErro = 'Erro ao deletar Cliente'
            )
  }
}
