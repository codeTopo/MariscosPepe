import { Component } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ClienteService } from '../cliente.service';
import { Cliente } from '../Models';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { DeleteComponent } from 'src/app/delete/delete.component';
import cli from '@angular/cli';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent {

  cliente:Cliente[]=[];
  filtro: string = '';

  constructor(
    private apicliente:ClienteService,
    public dialog: MatDialog,
  )
  {}

  ngOnInit(): void {
    this.GetCliente();
  };

  GetCliente(){
    this.apicliente.getCliente().subscribe(
      data => {
        this.cliente = data.data.filter(cli =>
          cli.nombre.toLowerCase().includes(this.filtro.toLowerCase()) ||
          cli.apellido.toLowerCase().includes(this.filtro.toLowerCase())
        );
      },
      error => {
        // Manejar el error aquí
        console.error(error);
      }
    );
  };


  AddCliente(cliente?: Cliente){
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '700px', // Ajusta el ancho según tus necesidades
      data: cliente ? { ...cliente } : null,
    });
    dialogRef.afterClosed().subscribe(result => {
      this.GetCliente();
    });
  };

  EditarCliente(cliente: Cliente) {
    this.AddCliente(cliente);
  };

  DeleteCliente(cliente:Cliente){
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: '500px', // Ajusta el ancho según tus necesidades
    });
    dialogRef.afterClosed().subscribe(result =>{
      if(result){
        this.apicliente.deleteCliente(cliente?.idCliente).subscribe(
          (response) => {
            console.log('Cliente eliminado:', response);
            this.GetCliente();
          },
          (error) => {
            // Manejar el error aquí
            console.error('Error al eliminar el cliente:', error);
          });
      }
    })
  }
}
