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
import { SplitterModule } from 'primeng/splitter';
import { DividerModule } from 'primeng/divider';
import { CardModule } from 'primeng/card';
import { MessageModule } from 'primeng/message';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import { ProgressBarModule } from 'primeng/progressbar';
import { PaginatorModule } from 'primeng/paginator';

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
    MessageModule,
    ToastModule,
    SplitterModule,
    DividerModule,
    CardModule,
    MatSidenavModule,
    MatCardModule,
    MatTableModule,
    ScrollPanelModule,
    ProgressBarModule,
    PaginatorModule,

  ]
})
export class PrimeModule { }
