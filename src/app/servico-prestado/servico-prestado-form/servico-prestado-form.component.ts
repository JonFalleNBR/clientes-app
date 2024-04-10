import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../clientes/cliente';
import { ClientesService } from '../../clientes.service';
import { response } from 'express';
import { ServicoPrestado } from '../servicoPrestado';



@Component({
  selector: 'app-servico-prestado-form',
  templateUrl: './servico-prestado-form.component.html',
  styleUrl: './servico-prestado-form.component.css'
})
export class ServicoPrestadoFormComponent implements OnInit{

  clientes: Cliente[] = [];
  servico: ServicoPrestado;


  constructor(
    private clienteService : ClientesService
  ){ this.servico = new ServicoPrestado(); }

  ngOnInit(): void {
    this.clienteService
    .getClientes()
    .subscribe ( response => this.clientes = response) //criando a listagem de clientes, tal qual no clientesListaComponent
  }


  onSubmit(){
    console.log(this.servico)
  }

}
