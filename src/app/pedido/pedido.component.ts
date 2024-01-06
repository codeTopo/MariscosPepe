import { Component, OnInit } from '@angular/core';
import { SignalRResponse, SignalRServiceService } from './signal-r.service';
import { LocalStorageService } from './local-storage.service';
import { DatosVenta } from '../venta/VentaModel';
import { DialogComponent } from './dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../api.service';


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
    private apiService:ApiService,
    private dialog: MatDialog)
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
    });
    this.signalRService.connectionStatus$.subscribe((status) => {
      this.isConnected = status;
    });
  };

  seleccionarVenta(id: number): void {
    this.apiService.getId(id).subscribe(
      (ventaInfo: DatosVenta) => {
        this.openDialog(ventaInfo);
      },
      error => {
        console.error('Error al obtener información de la venta:', error);
      }
    );
  }

  openDialog(ventaInfo: DatosVenta): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      data: { venta: ventaInfo }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El diálogo se cerró.');
    });
  }


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
