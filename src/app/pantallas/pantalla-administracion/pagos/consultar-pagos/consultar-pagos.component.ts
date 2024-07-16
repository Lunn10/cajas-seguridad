import { Component } from '@angular/core';
import { EncabezadoComponent } from '../../../../components/encabezado/encabezado.component';
import { RespuestaServerComponent } from '../../../../components/respuesta-server/respuesta-server.component';
import { BotonCargarComponent } from '../../../../components/boton-cargar/boton-cargar.component';

@Component({
  selector: 'app-consultar-pagos',
  standalone: true,
  imports: [
    EncabezadoComponent,
    RespuestaServerComponent,
    BotonCargarComponent
  ],
  templateUrl: './consultar-pagos.component.html',
  styleUrl: './consultar-pagos.component.scss'
})
export class ConsultarPagosComponent {

}
