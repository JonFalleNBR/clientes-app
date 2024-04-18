import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from './usuario';
import { AuthService } from '../auth.service';
import { error } from 'console';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

    username: string | null = null;
    password: string | null = null;
    cadastrando: boolean = false;
    mensagemSuccess: string | null = null;
    errors: String[] = [];


    constructor(
      private router: Router,
      private authService: AuthService
    ){
        
    }

    onSubmit(){
      //this.username = this.username.trim();
      console.log(`User: ${this.username}, Pass: ${this.password}`)

      this.router.navigate(['/home'])
    }
 
    preparaCadastrar(event: { preventDefault: () => void; }){
      event.preventDefault();
      this.cadastrando = true;
    }

    cancelaCadastro(){
      this.cadastrando = false;
    }


    cadastrar(){
      const usuario: Usuario = new Usuario(); 
      usuario.username = this.username;
      usuario.password = this.password;
      this.authService
          .salvar(usuario)
          .subscribe(response => {
              this.mensagemSuccess = 'Cadastro Realizado com Sucesso! Efetue o Login';     
          }, errorResponse => {  
            this.mensagemSuccess = null;
            this.errors = errorResponse.error.errors;
          })
    }
//esse ultimo errors vem do Back end
}
