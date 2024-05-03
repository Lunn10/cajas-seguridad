import { NgClass, NgIf } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tarjeta-tipo-usuario',
  standalone: true,
  imports: [
    NgIf,
    NgClass,
    MatIconModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './tarjeta-tipo-usuario.component.html',
  styleUrl: './tarjeta-tipo-usuario.component.scss'
})
export class TarjetaTipoUsuarioComponent {

  @Input() tipoUsuario = {
    id: 0,
    nombre: '',
    active: false,
    role: '',
    idUser: 0,
    creationDate: ''
  }

  @Output() eventoEnviarRespuestaServer : EventEmitter<String> = new EventEmitter<String>();

  mostrarMensajeInterfaz(mensaje : String) : void {
    this.eventoEnviarRespuestaServer.emit(mensaje);
  }

  cambiarEstadoTipoUsuario(id : Number, activo : boolean) : void {

  }
}
