import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelComponent } from './panel/panel.component';
import { PrimeModule } from '../prime/prime.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AccionesComponent } from './acciones/acciones.component';
import { DialogComponent } from './dialog/dialog.component';
import { FilterPipe } from './filter.pipe';


const routes: Routes = [
  { path: 'lista', component: PanelComponent, children: [
    { path: 'acciones', component: AccionesComponent, outlet: 'accionesOutlet' }
  ]}
];

@NgModule({
  declarations: [
    PanelComponent,
    AccionesComponent,
    DialogComponent,
    FilterPipe,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    PrimeModule,
    RouterModule.forChild(routes),
  ],
  providers:[
    MessageService
  ],
  exports: [RouterModule],

})
export class ProductoModule { }
