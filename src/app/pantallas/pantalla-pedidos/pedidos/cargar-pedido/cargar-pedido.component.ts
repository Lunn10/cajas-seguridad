import { Component } from '@angular/core';
import { EncabezadoComponent } from '../../../../components/encabezado/encabezado.component';
import { RespuestaServerComponent } from '../../../../components/respuesta-server/respuesta-server.component';

@Component({
  selector: 'app-cargar-pedido',
  standalone: true,
  imports: [
    EncabezadoComponent,
    RespuestaServerComponent
  ],
  templateUrl: './cargar-pedido.component.html',
  styleUrl: './cargar-pedido.component.scss'
})
export class CargarPedidoComponent {

}
