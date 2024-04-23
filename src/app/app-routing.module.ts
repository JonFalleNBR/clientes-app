import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component' 
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '' , component: LayoutComponent, children:[
    {path: 'home' , component: HomeComponent, canActivate : [AuthGuard]} // a rota para acessar a aplicação só sera permitida se o usuario estiver autenticado, de acordo com a regra configrada na classe auth.guard
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
