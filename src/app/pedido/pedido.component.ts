import { Component, OnInit } from '@angular/core';
import { SignalRResponse, SignalRServiceService } from './signal-r.service';
import { LocalStorageService } from './local-storage.service';
import { DatosVenta } from '../venta/VentaModel';
import {  MessageService } from 'primeng/api';
import { Router } from '@angular/router';


@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit{

  signalRData!: SignalRResponse;
  datosVenta: DatosVenta[] = [];
  idVenta: number[] = [];
  isConnected: boolean = false;

  constructor(
    private signalRService: SignalRServiceService,
    private localStorageService: LocalStorageService,
    private messageService: MessageService,
    private router: Router,
    )
  { };

  formatearFecha(fecha: string): string {
    const date = new Date(fecha);
    return date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })
      + ' ' + date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
  };

  ngOnInit(): void {
    this.actualizarMensajes();
    this.signalRService.onNuevoVentaAgregada((data: SignalRResponse) => {
      this.signalRData = data;
      const ventaId = data.venta.idVenta; // Obtener el ID de la nueva venta
      this.localStorageService.guardarMensaje(ventaId);
      this.getVentaDetails(ventaId);
      this.messageService.add({
        severity: 'info',
        summary: 'Nueva venta agregada',
      });
    });
    this.signalRService.connectionStatus$.subscribe((status) => {
      this.isConnected = status;
    });
  };

  manejarClickEnToast(event: any) {
    // Puedes redirigir a la ruta "/" aquí
    this.router.navigate(['/']);
  }

  getVentaDetails(id: number) {
    this.signalRService.getVenta(id).subscribe((data: DatosVenta[]) => {
      this.datosVenta = data;
    });
  };

  actualizarMensajes(): void {
    this.idVenta = this.localStorageService.getMensajesGuardados().reverse();
  }
  agregarNuevoMensaje(id: number): void {
    this.localStorageService.guardarMensaje(id);
    this.actualizarMensajes();
  }
  eliminarMensaje(id: number): void {
    this.localStorageService.eliminarMensaje(id);
    this.actualizarMensajes();
  }
  eliminarTodosLosMensajes(): void {
    this.localStorageService.eliminarTodosLosMensajes();
    this.actualizarMensajes();
  };
}
