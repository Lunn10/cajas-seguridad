import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { EncabezadoComponent } from '../../../../components/encabezado/encabezado.component';
import { RespuestaServerComponent } from '../../../../components/respuesta-server/respuesta-server.component';
import { PeticionesHttpService } from '../../../../services/peticiones-http.service';

@Component({
  selector: 'app-cargar-proceso',
  standalone: true,
  imports: [
    CommonModule,
    EncabezadoComponent,
    RespuestaServerComponent
  ],
  templateUrl: './cargar-proceso.component.html',
  styleUrl: './cargar-proceso.component.scss'
})
export class CargarProcesoComponent {
  listaArticulos : any [] = [];

  constructor(
    private _peticionesHttp : PeticionesHttpService
  ) { }

  ngOnInit(): void {
    this.obtenerArticulos();
  }

  obtenerArticulos() {
    this._peticionesHttp.listaArticulos().subscribe({
      next: (data) => {
        this.listaArticulos = data.data;
      },
      error: (error) => {
        this._peticionesHttp.setRespuestaServer(error.message);
      }
    });
  }
}
