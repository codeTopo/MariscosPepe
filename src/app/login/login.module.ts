import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidarComponent } from './validar/validar.component';
import { FormsModule } from '@angular/forms';
import { PrimeModule } from '../prime/prime.module';



@NgModule({
  declarations: [ValidarComponent],
  imports: [
    CommonModule,
    FormsModule,
    PrimeModule,
  ]
})
export class LoginModule { }
