import { Component } from '@angular/core';
import { RespuestaServerComponent } from '../../../../components/respuesta-server/respuesta-server.component';
import { PeticionesHttpService } from '../../../../services/peticiones-http.service';
import { NgFor, NgClass } from '@angular/common';
import { EncabezadoComponent } from '../../../../components/encabezado/encabezado.component';
import { TarjetaTipoUsuarioComponent } from '../../../../components/tarjeta-tipo-usuario/tarjeta-tipo-usuario.component';

@Component({
  selector: 'app-lista-tipos-usuario',
  standalone: true,
  imports: [
    NgFor,
    NgClass,
    EncabezadoComponent,
    RespuestaServerComponent,
    TarjetaTipoUsuarioComponent
  ],
  templateUrl: './lista-tipos-usuario.component.html',
  styleUrl: './lista-tipos-usuario.component.scss'
})
export class ListaTiposUsuarioComponent {
  constructor(
    private _peticionesHttp : PeticionesHttpService
  ) { }

  listaTipoUsuarios : any[] = [];
  mensajeServer : String = '';

  ngAfterContentInit() {
    this.obtenerListaTiposUsuario();
  }

  obtenerListaTiposUsuario() : void {
    this._peticionesHttp.obtenerTiposUsuarios().subscribe({
      next : (data) => {
        if(data.error) {
          this.mensajeServer = data.message;
        } else {
          this.listaTipoUsuarios = data.data;
        }
      },
      error : (data) => {
        this.mensajeServer = data.message;
      }
    });
  }

  establecerRespuestaServer(respuesta : String) : void {
    this.mensajeServer = respuesta;
    this.obtenerListaTiposUsuario();

    setTimeout(
      () => {
        this.mensajeServer = ''
        }, 3000
    )
  }
}
