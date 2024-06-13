import { Component } from '@angular/core';
import { EncabezadoComponent } from '../../../../components/encabezado/encabezado.component';
import { RespuestaServerComponent } from '../../../../components/respuesta-server/respuesta-server.component';
import { PeticionesHttpService } from '../../../../services/peticiones-http.service';

@Component({
  selector: 'app-cargar-factura',
  standalone: true,
  imports: [
    EncabezadoComponent,
    RespuestaServerComponent
  ],
  templateUrl: './cargar-factura.component.html',
  styleUrl: './cargar-factura.component.scss'
})
export class CargarFacturaComponent {
  constructor(
    private _peticionesHttp : PeticionesHttpService
  ) {

  }
}
