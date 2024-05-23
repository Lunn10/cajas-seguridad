import { CommonModule, NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PeticionesHttpService } from '../../services/peticiones-http.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tarjeta-articulo',
  standalone: true,
  imports: [
    CommonModule,
    NgClass,
    MatIconModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './tarjeta-articulo.component.html',
  styleUrl: './tarjeta-articulo.component.scss'
})
export class TarjetaArticuloComponent {
  @Output() eventoEnviarRespuestaServer : EventEmitter<string> = new EventEmitter<string>();
  @Input() articulo = {
    id: 0,
    active: false,
    nombre: '',
    nombreAnterior: '',
    descripcion: '',
    medidas: {
      ancho: 0,
      alto: 0,
      profundidad: 0
    }
  }

  constructor(
    private _peticionesHttp : PeticionesHttpService
  ) {}

  cambiarEstadoArticulo(idArticulo : number, estado : boolean) : void {
    this._peticionesHttp.cambiarEstadoArticulo(idArticulo, estado).subscribe({
      next: (data) => {
        this.mostrarMensajeInterfaz(data.message);  
      },
      error: (error) => {
        this.mostrarMensajeInterfaz(error.message);
      }
    })
  }

  mostrarMensajeInterfaz(mensaje : string) : void {
    this.eventoEnviarRespuestaServer.emit(mensaje);
  }
}
