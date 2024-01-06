import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from '../api.service';


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
export class SignalRServiceService {


  private hubConnection: HubConnection;
  private url = `${this.httpService.apiUrl}/notificationHub`;
  private connectionStatusSubject = new BehaviorSubject<boolean>(false);
  connectionStatus$ = this.connectionStatusSubject.asObservable();


  constructor(private http: HttpClient, private httpService: ApiService ) {
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
  };

  onNuevoVentaAgregada(callback: (data: SignalRResponse) => void) {
    this.hubConnection.on('RecibirNuevoVenta', async (data: SignalRResponse) => {
      console.log('Mensaje recibido de SignalR:', data);
      try {
        const ventaInfo = await this.httpService.getId(data.venta.idVenta).toPromise();
        console.log('Información adicional de la venta:', ventaInfo);
      } catch (error) {
        console.error('Error al obtener información adicional de la venta:', error);
      }
      callback(data);
    });
  };

}
