import { AfterContentInit, Component } from '@angular/core';
import { PeticionesHttpService } from '../../../../services/peticiones-http.service';
import { EncabezadoComponent } from '../../../../components/encabezado/encabezado.component';
import { RespuestaServerComponent } from '../../../../components/respuesta-server/respuesta-server.component';
import { TarjetaUsuarioComponent } from '../../../../components/tarjeta-usuario/tarjeta-usuario.component';
import { NgClass, NgFor } from '@angular/common';

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
  mensajeServer : String = '';

  ngAfterContentInit() {
    this.obtenerListaUsuarios();
  }

  obtenerListaUsuarios() : void {
    console.log("Enviando formulario");
    this._peticionesHttp.obtenerUsuarios().subscribe({
      next : (data) => {
        if(data.error) {
          this.mensajeServer = data.message;
        } else {
          this.listaUsuarios = data.data;
        }
      },
      error : (data) => {
        this.mensajeServer = data.message;
      }
    });
  }

  establecerRespuestaServer(respuesta : String) : void {
    this.mensajeServer = respuesta;
    this.obtenerListaUsuarios();

    setTimeout(
      () => {
        this.mensajeServer = ''
        }, 3000
    )
  }
}
