import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidarComponent } from './validar/validar.component';
import { FormsModule } from '@angular/forms';
import { PrimeModule } from '../prime/prime.module';
import { MessageService } from 'primeng/api';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'validar',
    component: ValidarComponent,
  },
];

@NgModule({
  declarations: [ValidarComponent],
  imports: [
    CommonModule,
    FormsModule,
    PrimeModule,
    RouterModule.forChild(routes),
  ],
  providers:[
    MessageService
  ],
  exports: [RouterModule],
})
export class LoginModule { }
