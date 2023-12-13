import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccionesComponent } from './producto/acciones/acciones.component';
//import { PedidosComponent } from './pedidos/pedidos.component';

const routes: Routes = [
  {path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule),  outlet: 'login',},
  {path:'producto', loadChildren:()=> import('./producto/producto.module').then(m =>m.ProductoModule),},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
