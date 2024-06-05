import { Component } from '@angular/core';
import { RespuestaServerComponent } from '../../../../components/respuesta-server/respuesta-server.component';
import { EncabezadoComponent } from '../../../../components/encabezado/encabezado.component';
import { PeticionesHttpService } from '../../../../services/peticiones-http.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-cargar-lista-precios',
  standalone: true,
  imports: [
    RespuestaServerComponent,
    EncabezadoComponent,
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './cargar-lista-precios.component.html',
  styleUrl: './cargar-lista-precios.component.scss'
})
export class CargarListaPreciosComponent {
  listaArticulos : any[] = [];

  constructor(
    private _peticionesHttp : PeticionesHttpService
  ) {
    this.obtenerArticulosConPrecios();
  }  

  obtenerArticulosConPrecios() {
    this._peticionesHttp.listaArticulosConPrecios().subscribe({
      next: (data) => {
        if(data.error) {
          this._peticionesHttp.setRespuestaServer(data.message);
        }

        this.listaArticulos = data.data;
      },
      error: (error) => {
        this._peticionesHttp.setRespuestaServer(error.message);
      }
    })
  }
}
