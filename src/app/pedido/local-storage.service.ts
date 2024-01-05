import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private readonly localStorageKey = 'mensajes';
  

  // Obtener los mensajes guardados en el Local Storage
  getMensajesGuardados(): number[] {
    const mensajes = localStorage.getItem(this.localStorageKey);
    return mensajes ? JSON.parse(mensajes) : [];
  }

  // Guardar un nuevo mensaje en el Local Storage
  guardarMensaje(id: number): void {
    const mensajes = this.getMensajesGuardados();
    mensajes.push(id);
    localStorage.setItem(this.localStorageKey, JSON.stringify(mensajes));
  }

  // Eliminar un solo mensaje del Local Storage
  eliminarMensaje(id: number): void {
    const mensajes = this.getMensajesGuardados();
    const index = mensajes.indexOf(id);
    if (index > -1) {
      mensajes.splice(index, 1);
      localStorage.setItem(this.localStorageKey, JSON.stringify(mensajes));
    }
  }

  // Eliminar toda la lista de mensajes del Local Storage
  eliminarTodosLosMensajes(): void {
    localStorage.removeItem(this.localStorageKey);
  }

  // Actualizar la lista completa de mensajes en el Local Storage
  actualizarMensajes(nuevosMensajes: number[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(nuevosMensajes));
  }

}