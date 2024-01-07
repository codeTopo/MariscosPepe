import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { SignalRServiceService } from './pedido/signal-r.service';
import { forkJoin } from 'rxjs';
import { Respuestas } from './Respuestas';
import { HerramientasService } from './herramientas.service';
import { LoginService } from './login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'MariscosPepe';

  isConnected: boolean = false;
  sidebarTop: boolean = false;
  sidebarLeft: boolean = false;
  botonColor: string = 'red'
  messages: string[] = [];
  isSuccess: boolean = false;
  isError: boolean = false;
  totalVentas!: any;

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private messageService: MessageService,
    private signalRService: SignalRServiceService,
    private herramienta:HerramientasService,
    private loginService: LoginService,
    )
  { }

  ngOnInit() {
    // Verificar si hay un objeto en el local storage
    const objetoEnLocalStorage = localStorage.getItem('token');
    // Establecer el color del botón en consecuencia
    this.botonColor = objetoEnLocalStorage ? 'green' : 'red';
    this.signalRService.connectionStatus$.subscribe((status) => {
      this.isConnected = status;
    });
  };
  logout(): void {
    // Llama al método de logout del servicio
    this.loginService.logout();
    //Puedes redirigir a la página de inicio u otro lugar después del cierre de sesión si es necesario
    this.router.navigate([{ outlets: { login: ['login', 'validar'] } }]);
    this.sidebarTop = true;
    this.cdr.detectChanges();
    this.messageService.add({
      severity: 'success',
      summary: 'Éxito',
      detail: 'Cerraste sesión con éxito'
    });
  };
  navigateToValidar() {
    this.router.navigate([{ outlets: { login: ['login', 'validar'] } }]);
    this.sidebarTop = true;
    this.cdr.detectChanges();
  };
  closeSidebarTop(): void {
    this.sidebarTop = false;
    this.cdr.detectChanges();
  };
  //uso para cerrar el sidebar
  closeSidebarLeft(): void {
    this.sidebarLeft = false;
  };
  showMessageHandler(severity: string, summary: string, detail: string): void {
    this.messageService.add({ severity, summary, detail });
  };
  //Navear a Home
  navigateToHome(): void {
    this.router.navigate(['/']);
  };
  //Herramientas
  obtenerTotalVentas() {
    this.herramienta.totalVentas().subscribe(
      respuesta => {
        if (respuesta.exito === 1) {
          this.totalVentas = respuesta.data;
        } else {
          // Manejar un escenario donde la respuesta no fue exitosa
        }
      },
      error => {
        console.error('Error al obtener el total de ventas', error);
        // Manejar el error
      }
    );
  };
  resetTables(tablas: string[]): void {
    const requests = tablas.map(tabla => this.herramienta.resetTable(tabla));
    forkJoin(requests).subscribe(
      (respuestas: Respuestas<any>[]) => {
        respuestas.forEach((respuesta, index) => {
          if (respuesta.exito === 1) {
            console.log(`Tabla ${tablas[index]}: ${respuesta.mensaje}`);
            this.isSuccess = true;
            this.isError = false;
            this.showMessage("Ventas Borradas ")
          } else {
            console.error(`Tabla ${tablas[index]}: ${respuesta.mensaje}`);
            this.isSuccess = false;
            this.isError = true;
            this.showErrorMessage(`Error al borrar datos de ${tablas[index]}`);
          }
        });
      },
      (error) => {
        console.error(error);
        this.isSuccess = false;
        this.isError = true;
        this.showErrorMessage(`Error al borrar datos `);
      }
    );
  }
  private showErrorMessage(message: string): void {
  };
   private showMessage(message: string): void {
  };


}
