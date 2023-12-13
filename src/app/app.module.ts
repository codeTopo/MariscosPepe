import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrimeModule } from './prime/prime.module';
import { HttpClientModule } from '@angular/common/http';
import { LoginModule } from './login/login.module';
import { MessageService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';




@NgModule({
  declarations: [
    AppComponent,
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
    HttpClientModule,

  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
