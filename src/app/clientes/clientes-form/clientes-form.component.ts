import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente'
import { ClientesService } from '../../clientes.service';
import { response } from 'express';
import { ParamMap, Params, Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrl: './clientes-form.component.css'
})
export class ClientesFormComponent implements OnInit {

  cliente: Cliente;
  sucess: boolean = false;
  errors: String[] = [];
  id: number = -1;

  constructor(private service: ClientesService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.cliente = new Cliente();
  }

  ngOnInit(): void {
    let params: Observable<Params> = this.activatedRoute.params
    params.subscribe(urlParams => {
      this.id = urlParams['id'];
      if (this.id) {
        this.service
          .getClientebyId(this.id)
          .subscribe(response => this
            .cliente = response,
            errorResponse => this.cliente = new Cliente()
          )
      }
    })

  }

  voltarParaListagem() {
    this.router.navigate(['/clientes/lista'])
  }


  onSubmit() {
    if (this.id) {
      this.service.atualizar(this.cliente)
        .subscribe(response => {
          this.sucess = true;
          this.errors = [];
        }, errorResponse => {
          this.errors = ['Erro ao atualizar o Cliente']
        })

    } else {
      this.service
        .salvar(this.cliente)
        .subscribe(response => {
          this.sucess = true;
          this.errors = [];
          this.cliente = response;
        }, errorResponse => {
          this.sucess = false;
          this.errors = errorResponse.error.errors;
        })
    }
  }
}
