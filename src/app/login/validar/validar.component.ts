import { Component } from '@angular/core';
import { LoginService } from '../login.service';
import { MessageService } from 'primeng/api';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-validar',
  templateUrl: './validar.component.html',
  styleUrls: ['./validar.component.css']
})
export class ValidarComponent {

  email: string | undefined;
  password: string | undefined;

  constructor(private loginService: LoginService,private messageService: MessageService,  private appComponent: AppComponent) { }

  // Método llamado cuando se presiona el botón
  Validar(): void {
    if (this.email && this.password) {
      this.loginService.login(this.email, this.password).subscribe(
        (response) => {
          this.appComponent.showMessageHandler('success', 'Inicio de Sesión', 'Inicio de Sesión exitoso');
          this.appComponent.closeSidebarTop();
        },
        (error) => {
          this.messageService.add({severity:"error", summary:"Error",detail:'Error en el servidor. Por favor, intenta nuevamente.'})
        }
      );
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'Por favor, ingrese correo electrónico y contraseña.' });;
    }
  };
}
