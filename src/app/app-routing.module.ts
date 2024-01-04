import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccionesComponent } from './producto/acciones/acciones.component';
//import { PedidosComponent } from './pedidos/pedidos.component';

const routes: Routes = [
  {path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule),  outlet: 'login',},
  {path:'producto', loadChildren:()=> import('./producto/producto.module').then(m =>m.ProductoModule),},
  {path:'cliente', loadChildren:()=> import('./cliente/cliente.module').then(m =>m.ClienteModule)},
  {path:'venta', loadChildren:()=> import('./venta/venta.module').then(m =>m.VentaModule)},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
