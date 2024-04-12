import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

    username: string | null = null;
    password: string | null = null;
    loginError: boolean = false;
    cadastrando: boolean = false;

    constructor(
      private router: Router
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

}
