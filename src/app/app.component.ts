import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from 'express';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MariscosPepe';

  sidebarTop: boolean = false;
  sidebarLeft: boolean = false;

  constructor(private router: Router, private cdr: ChangeDetectorRef, private messageService: MessageService) { }

  navigateToValidar() {
    this.router.navigate([{ outlets: { login: ['login', 'validar'] } }]);
    this.sidebarTop = true;
    this.cdr.detectChanges();
  };

  closeSidebarTop(): void {
    this.sidebarTop = false;
    // Asegurarse de detectar cambios para actualizar la vista
    this.cdr.detectChanges();
  };

  showMessageHandler(severity: string, summary: string, detail: string): void {
    this.messageService.add({ severity, summary, detail });
  }

  navigateToHome(): void {
    this.router.navigate(['/']);
  }
}
