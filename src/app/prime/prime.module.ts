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
import { ProgressBarModule } from 'primeng/progressbar';
import { PaginatorModule } from 'primeng/paginator';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import {MatDialogModule} from '@angular/material/dialog';
import { CheckboxModule } from 'primeng/checkbox';
import { TabViewModule } from 'primeng/tabview';


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
    ScrollPanelModule,
    ProgressBarModule,
    PaginatorModule,
    DynamicDialogModule,
    MatDialogModule,
    CheckboxModule,
    TabViewModule,
  ]
})
export class PrimeModule { }
