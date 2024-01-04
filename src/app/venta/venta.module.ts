import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MessageService } from 'primeng/api';
import { PrimeModule } from '../prime/prime.module';
import { PedidosComponent } from './pedidos/pedidos.component';
import { DialogComponent } from './dialog/dialog.component';


const routes: Routes = [
  {path:'pedido', component:PedidosComponent}
];


@NgModule({
  declarations: [
    PedidosComponent,
    DialogComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    PrimeModule,
    RouterModule.forChild(routes),

  ],
  providers:[
    MessageService,
    DatePipe,
  ],
  exports: [RouterModule],
})
export class VentaModule { }
