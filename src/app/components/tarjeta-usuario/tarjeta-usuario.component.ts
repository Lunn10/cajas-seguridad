import { NgClass, NgIf } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PeticionesHttpService } from '../../services/peticiones-http.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tarjeta-usuario',
  standalone: true,
  imports: [
    NgIf,
    NgClass,
    MatIconModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './tarjeta-usuario.component.html',
  styleUrl: './tarjeta-usuario.component.scss'
})
export class TarjetaUsuarioComponent {

  constructor (
    private _peticionesHttp : PeticionesHttpService
  ) {}

  @Input() usuario = {
    userName: '',
    active: true,
    role: '',
    idUser: 0,
    creationDate: ''
  }

  @Output() eventoEnviarRespuestaServer : EventEmitter<string> = new EventEmitter<string>();

  cambiarEstadoUsuario (idUser : Number, estadoActual : boolean) : void {
    this._peticionesHttp.cambiarEstadoUsuario(idUser, estadoActual).subscribe({
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
