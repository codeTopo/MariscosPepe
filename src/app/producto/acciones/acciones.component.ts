import { Component } from '@angular/core';
import { ProductoService } from '../producto.service';
import { Producto } from '../ProductosModule';
import { Message, MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-acciones',
  templateUrl: './acciones.component.html',
  styleUrls: ['./acciones.component.css']
})
export class AccionesComponent {

  formSubmitted = false;
  productoForm!: FormGroup;
  messages: Message[] = [];
  loading = false;

  constructor(
    private productoService: ProductoService,
    private messageService: MessageService,
    private fb: FormBuilder,
    ) { }

  ngOnInit(): void {
    this.productoForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: [null, [Validators.required, Validators.min(0)]],
      ubicacion: ['', Validators.required],
    });
  };

  getFormErrorMessages(): Message[] {
    const errorMessages: Message[] = [];
    for (const controlName in this.productoForm.controls) {
      if (this.productoForm.get(controlName)?.hasError('required')) {
        const fieldName = this.capitalizeFirstLetter(controlName);
        const errorMessage = `${fieldName} es requerido.`;
        errorMessages.push({ severity: 'error', summary: errorMessage });
      }
    }

    return errorMessages;
  }

  capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }


  // Ejemplo de cómo puedes usar el servicio para crear un nuevo producto
  crearNuevoProducto() {
    this.formSubmitted = true;
    if (this.productoForm.invalid) {
      this.messages = this.getFormErrorMessages();
      return;
    }
    if (this.productoForm.valid) {
      this.loading = true;
      const nuevoProducto: Producto = this.productoForm.value;
      this.productoService.crearProducto(nuevoProducto)
      .pipe(
        finalize(() => {
          // Esta parte se ejecutará tanto si la solicitud tiene éxito como si hay un error
          this.loading = false; // Ocultar ProgressBar
        })
      )
      .subscribe(
        respuesta => {
          this.messageService.add({ severity: "success", summary: "Exitoso", detail: 'El Producto se Agregó Correctamente' });
          console.log(respuesta);
          this.productoForm.reset();
        },
        error => {
          this.messageService.add({ severity: "error", summary: "Error", detail: 'Error en el servidor. Por favor, intenta nuevamente.' });
          console.error(error);
        }
      );
    }
  }
}
