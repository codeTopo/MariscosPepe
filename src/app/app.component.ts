import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'MariscosPepe';

  sidebarTop: boolean = false;
  sidebarLeft: boolean = false;
  botonColor: string = 'red' // Nueva propiedad para el color del botón

  constructor(private router: Router, private cdr: ChangeDetectorRef, private messageService: MessageService) { }

  ngOnInit() {
    // Verificar si hay un objeto en el local storage
    const objetoEnLocalStorage = localStorage.getItem('token');
    // Establecer el color del botón en consecuencia
    this.botonColor = objetoEnLocalStorage ? 'green' : 'red';
  }

  navigateToValidar() {
    this.router.navigate([{ outlets: { login: ['login', 'validar'] } }]);
    this.sidebarTop = true;
    this.cdr.detectChanges();
  };

  closeSidebarTop(): void {
    this.sidebarTop = false;
    this.cdr.detectChanges();
  };

  closeSidebarLeft(): void {
    this.sidebarLeft = false;
  };


  showMessageHandler(severity: string, summary: string, detail: string): void {
    this.messageService.add({ severity, summary, detail });
  };

  navigateToHome(): void {
    this.router.navigate(['/']);
  };


}
