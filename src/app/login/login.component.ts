import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from './usuario';
import { AuthService } from '../auth.service';
import { error } from 'console';
import { response } from 'express';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

    username: string = ''
    password: string  = ''
    cadastrando: boolean = false;
    mensagemSuccess: string | null = null;
    errors: String[] = [];


    constructor(
      private router: Router,
      private authService: AuthService
    ){
        
    }

    onSubmit(){
      console.log('Tentando logar com username:', this.username, 'e password:', this.password);
    
      this.authService
            .tentarLogar(this.username, this.password)
            
            .subscribe(response => {
                const access_token = JSON.stringify(response); // transforma o objeto JSON que contem o token em uma string
                localStorage.setItem('access_token',access_token) // armazenar o token no localstorage la do browser
              this.router.navigate(['/home'])
            }, errorResponse => {
               this.errors = ['Usuario e/ou senha incorretos']
            })
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
              this.cadastrando = false;
              this.username = '';   
              this.password = '';
              this.errors = [];
          }, errorResponse => {  
            this.mensagemSuccess = null;
            this.errors = errorResponse.error.errors;
          })
    }
//esse ultimo errors vem do Back end
}
