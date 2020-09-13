import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { RegistroComponent } from './Components/registro/registro.component';
import { ResetComponent } from './Components/reset/reset.component';
import {LoginComponent} from './Components/login/login.component';
import {DetalleComponent} from './Components/detalle/detalle.component';
import { ReservacionesComponent } from './Components/reservaciones/reservaciones.component';
  


const routes: Routes = [
  { path: 'home', component: HomeComponent }, 
  { path: 'navbar', component: NavbarComponent },  
  {path: 'registro', component:RegistroComponent},
   {path: 'reset', component:ResetComponent},
   {path: 'login', component:LoginComponent},
   {path: 'detalle/:id', component:DetalleComponent},
  {path: 'reservaciones', component:ReservacionesComponent}
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
