import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../clientes/cliente';
import { ClientesService } from '../../clientes.service';
import { response } from 'express';
import { ServicoPrestado } from '../servicoPrestado';
import { ServicoPrestadoService } from '../../servico-prestado.service';


@Component({
  selector: 'app-servico-prestado-form',
  templateUrl: './servico-prestado-form.component.html',
  styleUrl: './servico-prestado-form.component.css'
})
export class ServicoPrestadoFormComponent implements OnInit{

  clientes: Cliente[] = [];
  servico: ServicoPrestado;
  sucess: boolean = false;
  errors: String[] = [];


  constructor(
    private clienteService : ClientesService, private service: ServicoPrestadoService
  ){ 
    this.servico = new ServicoPrestado();
   }

  ngOnInit(): void {
    this.clienteService
    .getClientes()
    .subscribe ( response => this.clientes = response) //criando a listagem de clientes, tal qual no clientesListaComponent
  }


  onSubmit(){

    this.servico.data = this.servico.data.trim();
    this.servico.preco = this.servico.preco.trim(); //trim para evitar espaços em branco e dar um null

    this.service
    .salvar(this.servico)
    .subscribe(response => {
      this.sucess = true;
      this.errors = [];
      this.servico = new ServicoPrestado();
    }, errorResponse => {
      this.sucess = false;
      this.errors = errorResponse.error.errors;
    })
  }
}


