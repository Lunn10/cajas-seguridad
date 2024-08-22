import { Component } from '@angular/core';
import { EncabezadoComponent } from '../../../../components/encabezado/encabezado.component';
import { RespuestaServerComponent } from '../../../../components/respuesta-server/respuesta-server.component';
import { BotonCargarComponent } from '../../../../components/boton-cargar/boton-cargar.component';
import { CommonModule } from '@angular/common';
import { PeticionesHttpService } from '../../../../services/peticiones-http.service';

@Component({
    selector: 'app-consultar-lista-precios',
    standalone: true,
    templateUrl: './consultar-lista-precios.component.html',
    styleUrl: './consultar-lista-precios.component.scss',
    imports: [
        EncabezadoComponent,
        RespuestaServerComponent,
        CommonModule,
        BotonCargarComponent
    ]
})
export class ConsultarListaPreciosComponent {
  listaArticulos : any[] = [];
  ultimaLista : {
    id: number, fecha: Date | null, porcentaje: number
  } = {
    id: 0,
    fecha: null,
    porcentaje: 0
  }

  constructor(
    private _peticionesHttp : PeticionesHttpService,
  ) {
    this.obtenerDatosListaPrecios();
  }

  obtenerDatosListaPrecios() {
    this._peticionesHttp.listaArticulosConPrecios(0).subscribe({
      next: (data) => {
        if (data.error) {
          this._peticionesHttp.setRespuestaServer(data.message);
        } else {
          let datosRespuesta = data.data;

          this.listaArticulos = datosRespuesta.articulos;
          this.ultimaLista.id = datosRespuesta.idLista;
          this.ultimaLista.porcentaje = datosRespuesta.porcentaje;
          this.ultimaLista.fecha = datosRespuesta.fecha;
        }
      },
      error: (error) => {
        this._peticionesHttp.setRespuestaServer(error.message);
      }
    });
  }
}
