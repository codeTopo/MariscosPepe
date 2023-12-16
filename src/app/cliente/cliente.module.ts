import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MessageService } from 'primeng/api';
import { PrimeModule } from '../prime/prime.module';
import { ListaComponent } from './lista/lista.component';
import { HttpClientModule } from '@angular/common/http';
import { DialogComponent } from './dialog/dialog.component';
import { FilterPipe } from './filter.pipe';




const routes: Routes = [
  {path:'cliente', component:ListaComponent}
];


@NgModule({
  declarations: [
    ListaComponent,
    DialogComponent,
    FilterPipe
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
    MessageService
  ],
  exports: [RouterModule],

})
export class ClienteModule { }
