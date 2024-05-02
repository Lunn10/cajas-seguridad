import { NgClass } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PeticionesHttpService } from '../../services/peticiones-http.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tarjeta-usuario',
  standalone: true,
  imports: [
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
    active: false,
    role: '',
    idUser: 0,
    creationDate: ''
  }

  @Output() eventoEnviarRespuestaServer : EventEmitter<String> = new EventEmitter<String>();

  bajaUsuario (idUser : Number) : void {
    this._peticionesHttp.bajaUsuario(idUser).subscribe({
      next: (data) => {
        this.eventoEnviarRespuestaServer.emit(data.message);
      },
      error: (error) => {
        this.eventoEnviarRespuestaServer.emit(error.message);
      }
    })
  }
}
