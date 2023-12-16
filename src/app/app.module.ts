import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrimeModule } from './prime/prime.module';
import { HttpClientModule } from '@angular/common/http';
import { LoginModule } from './login/login.module';
import { MessageService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DeleteComponent } from './delete/delete.component';
import { ClienteModule } from './cliente/cliente.module';




@NgModule({
  declarations: [
    AppComponent,
    DeleteComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    PrimeModule,
    AppRoutingModule,
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    ClienteModule,
    HttpClientModule,
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
