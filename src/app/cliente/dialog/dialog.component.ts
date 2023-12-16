import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClienteService } from '../cliente.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message, MessageService } from 'primeng/api';
import { Cliente } from '../Models';
import { Observable, finalize } from 'rxjs';
import { response } from 'express';
import { Respuestas } from 'src/app/Respuestas';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  addcliente!:FormGroup;
  messages: Message[] = [];
  loading = false;

  constructor(
    public dialogRef :MatDialogRef<DialogComponent>,
    private apicliente : ClienteService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Cliente
  ){
    this.addcliente = this.fb.group({

      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      calle: ['', Validators.required],
      colonia: ['', Validators.required],
      numero: ['', Validators.required],
      telefono: ['', Validators.required],
      referencia: ['', Validators.required],
    });
  };

  ngOnInit(): void {
    if (this.data) {
      this.addcliente.patchValue(this.data);
    }
  };



  cerrar(){
    this.dialogRef.close();
  };

  ErrorMensages(): Message[] {
    const errorMessages: Message[] = [];
    for (const controlName in this.addcliente.controls) {
      if (this.addcliente.get(controlName)?.hasError('required')) {
        const fieldName = this.FirstLetter(controlName);
        const errorMessage = `${fieldName} es requerido.`;
        errorMessages.push({ severity: 'error', summary: errorMessage });
      }
    }
    return errorMessages;
  };
  FirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  AddCiente(){
    if (this.addcliente.invalid) {
      this.messages = this.ErrorMensages();
      return;
    }
    if(this.addcliente.valid){
      this.loading = true;
      const cliente :Cliente = this.addcliente.value;
      if (this.data) {
        // Si hay datos, significa que se está editando un cliente existente
        const clienteId = this.data.idCliente; // Asegúrate de tener una propiedad "id" en tu modelo Cliente
        this.apicliente.putCliente(clienteId, cliente)
          .pipe(
            finalize(() => {
              this.loading = false; // Ocultar ProgressBar
            })
          )
          .subscribe(response => {
            console.log(response);
            this.addcliente.reset();
            this.cerrar();
          });
      } else{
      this.apicliente.addCliente(cliente)
      .pipe(
        finalize(() => {
          // Esta parte se ejecutará tanto si la solicitud tiene éxito como si hay un error
          this.loading = false; // Ocultar ProgressBar
        })
      ).subscribe(response =>{
        console.log(response);
        this.addcliente.reset();
        this.cerrar();
      });
    }

    }
  };

}
