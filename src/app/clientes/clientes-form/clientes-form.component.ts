import { Component, OnInit } from '@angular/core';
import {Cliente} from '../cliente'
import {ClientesService} from '../../clientes.service';
import { response } from 'express';

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrl: './clientes-form.component.css'
})
export class ClientesFormComponent implements OnInit{

    cliente: Cliente;
    sucess: boolean = false;
    errors: String[] = [];

  constructor(private service : ClientesService){
      this.cliente = new Cliente();
  }

  ngOnInit(): void {
    
  }

  onSubmit(){
      this.service
      .salvar(this.cliente)
      .subscribe(response => {
            this.sucess = true;
            this.errors = []; 
            this.cliente = response;                   
          },   errorResponse => {
            this.sucess = false;
            this.errors = errorResponse.error.errors;    
          })
  }

}
