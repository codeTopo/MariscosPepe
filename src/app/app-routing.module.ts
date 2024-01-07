import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PedidoComponent } from './pedido/pedido.component';
import { AuthGuard } from './AuthGuard';

const routes: Routes = [
  { path: '', redirectTo: '/pedidos', pathMatch: 'full' },
  { path: 'pedidos', component: PedidoComponent, canActivate: [AuthGuard]  },
  {path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule),  outlet: 'login',},
  {path:'producto', loadChildren:()=> import('./producto/producto.module').then(m =>m.ProductoModule), canActivate: [AuthGuard] },
  {path:'cliente', loadChildren:()=> import('./cliente/cliente.module').then(m =>m.ClienteModule), canActivate: [AuthGuard] },
  {path:'venta', loadChildren:()=> import('./venta/venta.module').then(m =>m.VentaModule), canActivate: [AuthGuard] },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
