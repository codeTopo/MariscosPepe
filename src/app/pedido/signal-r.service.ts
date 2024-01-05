import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { HubConnection, HttpClient, HubConnectionBuilder } from '@microsoft/signalr';
import { HttpHeaders } from '@angular/common/http';
import { DatosVenta } from '../venta/VentaModel';


export interface Concepto {
  idConcepto: number;
  idProducto: number;
  idVenta: number;
  cantidad: number;
  precio: number;
}

 export interface SignalRResponse {
    venta: {
    fecha: string;
    idCliente: number;
    idVenta: number;
    pago: string;
    total: number;
    };
   concepto: Concepto[];
}

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  private hubConnection: HubConnection;
  private url = `${this.httpService.apiUrl}/notificationHub`;
  private connectionStatusSubject = new BehaviorSubject<boolean>(false);
  connectionStatus$ = this.connectionStatusSubject.asObservable();

  constructor(private http: HttpClient, private httpService:ApiService) {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.url)
      .build();
    this.startConnection();
  }

  startConnection() {
    this.hubConnection
      .start()
      .then(() => {
        console.log('Conectado al hub de SignalR: notificationHub');
        this.connectionStatusSubject.next(true);
      })
      .catch((error) => {
        console.error('Error al conectar con SignalR: ', error);
        this.connectionStatusSubject.next(false);
      });
  }

  onNuevoVentaAgregada(callback: (data: SignalRResponse) => void) {
    this.hubConnection.on('RecibirNuevoVenta', (data: SignalRResponse) => {
      console.log('Mensaje recibido de SignalR:', data);
      callback(data);
    });
  };


  getVenta() {

  };

}
