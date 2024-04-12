import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

    username: string | null = null;
    password: string | null = null;
    loginError: boolean = false;


    constructor(){
        
    }

    onSubmit(){
      //this.username = this.username.trim();

      console.log(`User: ${this.username}, Pass: ${this.password}`)
    }

}
