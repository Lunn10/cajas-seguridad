import { Component } from '@angular/core';
import { EncabezadoComponent } from '../../../../components/encabezado/encabezado.component';
import { RespuestaServerComponent } from '../../../../components/respuesta-server/respuesta-server.component';
import { BotonCargarComponent } from '../../../../components/boton-cargar/boton-cargar.component';

@Component({
  selector: 'app-consultar-lista-precios',
  standalone: true,
  imports: [
    EncabezadoComponent,
    RespuestaServerComponent,
    BotonCargarComponent
  ],
  templateUrl: './consultar-lista-precios.component.html',
  styleUrl: './consultar-lista-precios.component.scss'
})
export class ConsultarListaPreciosComponent {

}
