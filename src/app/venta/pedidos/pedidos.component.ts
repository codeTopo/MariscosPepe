import { Component } from '@angular/core';
import { DatosVenta } from '../VentaModel';
import { VentasService } from '../ventas.service';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']

})
export class PedidosComponent {

  venta:DatosVenta[]=[];
  ventaSeleccionada: DatosVenta | null = null;
  selectedValues: string[] = [];

  constructor(
    private apiventa:VentasService,
    public _datePipe: DatePipe,
    public dialog: MatDialog,
  ){};

  ngOnInit(): void {
    this.GetVentas();
  };

  get datePipe(): DatePipe {
    return this._datePipe;
  };


  GetVentas(){
    this.apiventa.GetVentas().subscribe(
      data => {
        this.venta = data.data
        console.log('ventas', data)
      },
      error => {
        console.error(error);
      }
    )
  };

  openDialog(venta: DatosVenta): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      data: { venta: venta }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialogo cerrado');
    });
  }

}
