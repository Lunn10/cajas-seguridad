import { CommonModule, NgClass, NgIf } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { PeticionesHttpService } from '../../services/peticiones-http.service';

@Component({
  selector: 'app-tarjeta-tipo-usuario',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './tarjeta-tipo-usuario.component.html',
  styleUrl: './tarjeta-tipo-usuario.component.scss'
})
export class TarjetaTipoUsuarioComponent {

  constructor (
    private _peticionesHttp : PeticionesHttpService
  ) {}

  @Input() tipoUsuario = {
    idType: 0,
    active: false,
    role: '',
    creationDate: ''
  }

  @Output() eventoEnviarRespuestaServer : EventEmitter<string> = new EventEmitter<string>();

  mostrarMensajeInterfaz(mensaje : string) : void {
    this.eventoEnviarRespuestaServer.emit(mensaje);
  }

  cambiarEstadoTipoUsuario(idTipoUsuario : Number, estadoActual : boolean) : void {
    this._peticionesHttp.cambiarEstadoTipoUsuario(idTipoUsuario, estadoActual).subscribe({
      next: (data) => {
        this.mostrarMensajeInterfaz(data.message);
      },
      error: (error) => {
        this.mostrarMensajeInterfaz(error.message);
      }
    })
  }
}
