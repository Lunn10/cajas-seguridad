import { Component } from '@angular/core';
import { PeticionesHttpService } from '../../../../services/peticiones-http.service';
import { NgFor, NgClass } from '@angular/common';
import { EncabezadoComponent } from '../../../../components/encabezado/encabezado.component';
import { TarjetaTipoUsuarioComponent } from '../../../../components/tarjeta-tipo-usuario/tarjeta-tipo-usuario.component';
import { RespuestaServerComponent } from '../../../../components/respuesta-server/respuesta-server.component';

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

  ngAfterContentInit() {
    this.obtenerListaTiposUsuario();
  }

  obtenerListaTiposUsuario() : void {
    this._peticionesHttp.obtenerTiposUsuarios(true).subscribe({
      next : (data) => {
        if(data.error) {
          this.mostrarMensajeServer(data.message);
        } else {
          this.listaTipoUsuarios = data.data;
        }
      },
      error : (data) => {
        this.mostrarMensajeServer(data.message);
      }
    });
  }

  establecerRespuestaServer(respuesta : string) : void {
    this.mostrarMensajeServer(respuesta);
    this.obtenerListaTiposUsuario();
  }
  
  mostrarMensajeServer(mensaje : string) : void {
    this._peticionesHttp.setRespuestaServer(mensaje);
  }
}
