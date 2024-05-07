import { Component } from '@angular/core';
import { EncabezadoComponent } from '../../../../components/encabezado/encabezado.component';
import { RespuestaServerComponent } from '../../../../components/respuesta-server/respuesta-server.component';

@Component({
  selector: 'app-consultar-cliente',
  standalone: true,
  imports: [
    EncabezadoComponent,
    RespuestaServerComponent
  ],
  templateUrl: './consultar-cliente.component.html',
  styleUrl: './consultar-cliente.component.scss'
})
export class ConsultarClienteComponent {
  mensajeServer : String = '';
}
