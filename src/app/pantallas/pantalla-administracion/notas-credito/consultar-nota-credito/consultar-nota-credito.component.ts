import { Component } from '@angular/core';
import { EncabezadoComponent } from '../../../../components/encabezado/encabezado.component';
import { RespuestaServerComponent } from '../../../../components/respuesta-server/respuesta-server.component';
import { BotonCargarComponent } from '../../../../components/boton-cargar/boton-cargar.component';

@Component({
  selector: 'app-consultar-nota-credito',
  standalone: true,
  imports: [
    EncabezadoComponent,
    RespuestaServerComponent,
    BotonCargarComponent
  ],
  templateUrl: './consultar-nota-credito.component.html',
  styleUrl: './consultar-nota-credito.component.scss'
})
export class ConsultarNotaCreditoComponent {

}
