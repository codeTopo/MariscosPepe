// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from './login/login.service';
import { MessageService } from 'primeng/api';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  sidebarTop: boolean = false;
  constructor(private authService: LoginService, private router: Router, private messageService: MessageService) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      // El usuario ha iniciado sesión
      return true;
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Debes iniciar sesión para acceder.' });
      return false;
    }
  }
}
