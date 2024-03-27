import { Component, OnInit } from '@angular/core';
import {Router } from '@angular/router'

import { Cliente } from '../cliente';
import { ClientesService } from '../../clientes.service';
import { response } from 'express';

@Component({
  selector: 'app-clientes-lista',
  templateUrl: './clientes-lista.component.html',
  styleUrl: './clientes-lista.component.css'
})
export class ClientesListaComponent implements OnInit {

  clientes: Cliente[] = [];

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
}
