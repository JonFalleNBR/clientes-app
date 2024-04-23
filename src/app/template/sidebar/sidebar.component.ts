import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  usuarioLogado?: string ;

  constructor(
    private authService : AuthService,
    private router : Router
  ){}

  ngOnInit(): void{
      this.usuarioLogado = this.authService.getUsuarioAutenticado();
  }


  logOut(){
    this.authService.encerrarSessao(); 
    this.router.navigate(['/login'])

  }
}
