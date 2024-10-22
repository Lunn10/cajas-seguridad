import { AfterContentInit, Component, EventEmitter, Output } from '@angular/core';
import { EncabezadoComponent } from '../../../../components/encabezado/encabezado.component';
import { RespuestaServerComponent } from '../../../../components/respuesta-server/respuesta-server.component';
import { PeticionesHttpService } from '../../../../services/peticiones-http.service';
import { TarjetaArticuloComponent } from '../../../../components/tarjeta-articulo/tarjeta-articulo.component';
import { CommonModule, NgClass } from '@angular/common';
import { BotonCargarComponent } from '../../../../components/boton-cargar/boton-cargar.component';

@Component({
  selector: 'app-consultar-articulo',
  standalone: true,
  imports: [
    EncabezadoComponent,
    RespuestaServerComponent,
    TarjetaArticuloComponent,
    BotonCargarComponent,
    NgClass,
    CommonModule
  ],
  templateUrl: './consultar-articulo.component.html',
  styleUrl: './consultar-articulo.component.scss'
})
export class ConsultarArticuloComponent implements AfterContentInit {
  listaArticulos : any[] = [];

  constructor(
    private _peticionesHttp : PeticionesHttpService
  ) {

  }

  ngAfterContentInit() {
    this.obtenerListaArticulos();
  }

  obtenerListaArticulos() {
    this._peticionesHttp.listaArticulos().subscribe({
      next: (data) => {
        if(data.error) {
          this._peticionesHttp.setRespuestaServer(data.message);
        }

        this.listaArticulos = data.data;
      },
      error: (error) => {
        alert(error.error);
        this._peticionesHttp.setRespuestaServer(error.message);
      }
    })
  }

  establecerRespuestaServer(respuesta : string) : void {
    this._peticionesHttp.setRespuestaServer(respuesta);
    this.obtenerListaArticulos();
  }
}
