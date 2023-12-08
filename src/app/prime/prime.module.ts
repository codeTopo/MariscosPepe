import { NgModule } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { SidebarModule } from 'primeng/sidebar';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';

@NgModule({
  exports:[
    ToolbarModule,
    ButtonModule,
    TooltipModule,
    SidebarModule,
    PanelModule,
    InputTextModule,
    PasswordModule,
    MessagesModule,
    ToastModule,
  ]
})
export class PrimeModule { }
