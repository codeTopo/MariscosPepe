import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DatosVenta } from '../VentaModel';
import { VentasService } from '../ventas.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html'
})
export class DialogComponent {

  mostrarProgressBar = false;
  status: string;
  repartidor: string;
  selectedRepartidores: { [key: string]: boolean } = {};
  selectedStatus: { [key: string]: boolean } = {};
  listaRepartidores: any[] = [
    { id: 1, nombre: 'Repartidor 1' },
    { id: 2, nombre: 'Repartidor 2' },
    { id: 3, nombre: 'Repartidor 3' },
    { id: 4, nombre: 'Repartidor 4' },
    // ... más repartidores
  ];
  listaStatus: string[] = ['En proceso', 'Entregado', 'Cancelado'];  // Lista de opciones de status


  constructor(
  public dialogRef:MatDialogRef<DialogComponent>,
  private ventasService:VentasService,
  @Inject(MAT_DIALOG_DATA) public data: { venta: DatosVenta }
  )
  {
    this.status = data.venta.status;
    this.repartidor = data.venta.repartidor;
  }

  cerrar(){
    this.dialogRef.close();
  };

  guardarCambios(): void {
    this.mostrarProgressBar = true;
    const ventaId = this.data.venta.idVenta;
    const statusSeleccionado = this.listaStatus.find(status => this.selectedStatus[status]) || '';
    const repartidoresSeleccionados = Object.keys(this.selectedRepartidores)
      .filter(repartidor => this.selectedRepartidores[repartidor]);
    const repartidorSeleccionado = repartidoresSeleccionados.length > 0 ? repartidoresSeleccionados[0] : null;
    this.ventasService.EditarVenta(ventaId, { status: statusSeleccionado,  repartidor: repartidorSeleccionado as string  })
      .subscribe(result => {
        this.mostrarProgressBar = false;
        console.log('Venta editada con éxito', result);
        this.dialogRef.close();
      }, error => {
        this.mostrarProgressBar = false;
        console.error('Error al editar la venta', error);
      });
  }
}
