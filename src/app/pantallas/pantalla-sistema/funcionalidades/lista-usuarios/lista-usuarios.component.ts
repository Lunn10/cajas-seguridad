import { AfterContentInit, Component } from '@angular/core';
import { PeticionesHttpService } from '../../../../services/peticiones-http.service';
import { EncabezadoComponent } from '../../../../components/encabezado/encabezado.component';
import { TarjetaUsuarioComponent } from '../../../../components/tarjeta-usuario/tarjeta-usuario.component';
import { NgClass, NgFor } from '@angular/common';
import { RespuestaServerComponent } from '../../../../components/respuesta-server/respuesta-server.component';

@Component({
  selector: 'app-lista-usuarios',
  standalone: true,
  imports: [
    EncabezadoComponent,
    RespuestaServerComponent,
    TarjetaUsuarioComponent,
    NgFor,
    NgClass
  ],
  templateUrl: './lista-usuarios.component.html',
  styleUrl: './lista-usuarios.component.scss'
})
export class ListaUsuariosComponent implements AfterContentInit {
  constructor(
    private _peticionesHttp : PeticionesHttpService
  ) { }

  listaUsuarios : any[] = [];

  ngAfterContentInit() {
    this.obtenerListaUsuarios();
  }

  obtenerListaUsuarios() : void {
    console.log("Enviando formulario");
    this._peticionesHttp.obtenerUsuarios().subscribe({
      next : (data) => {
        if(data.error) {
          this.mostrarMensajeServer(data.message);
        } else {
          this.listaUsuarios = data.data;
        }
      },
      error : (data) => {
        this.mostrarMensajeServer(data.message);
      }
    });
  }
  
  mostrarMensajeServer(mensaje : string) : void {
    this._peticionesHttp.setRespuestaServer(mensaje);
  }

  establecerRespuestaServer(respuesta : string) : void {
    this.mostrarMensajeServer(respuesta);
    this.obtenerListaUsuarios();
  }
}
