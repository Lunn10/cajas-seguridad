import { Component, ElementRef, ViewChild } from '@angular/core';
import { RespuestaServerComponent } from '../../../../components/respuesta-server/respuesta-server.component';
import { EncabezadoComponent } from '../../../../components/encabezado/encabezado.component';
import { PeticionesHttpService } from '../../../../services/peticiones-http.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-cargar-pago',
  standalone: true,
  imports: [
    RespuestaServerComponent,
    EncabezadoComponent,
    ReactiveFormsModule,
    CommonModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule
  ],
  templateUrl: './cargar-pago.component.html',
  styleUrl: './cargar-pago.component.scss'
})
export class CargarPagoComponent {
  formularioConsultarFacturasImpagas : FormGroup;
  formularioCargarPago : FormGroup;
  opcionesSelectClientes : any[] = [];
  valoresFiltradosClientes : any[] = [];
  @ViewChild('inputCliente') inputCliente!: ElementRef<HTMLInputElement>;
  facturasImpagas : any[] = [];

  constructor(
    private _peticionesHttp : PeticionesHttpService,
    private formBuilder : FormBuilder
  ) { 
    this.formularioConsultarFacturasImpagas = this.formBuilder.group({
      cliente: ['']
    })

    this.formularioCargarPago = this.formBuilder.group({
      idPago: [0],
      cliente: [''],
      retenciones: this.formBuilder.array([]),
      pagos: this.formBuilder.array([])
    })

    this.obtenerListaClientes();
  }

  obtenerListaClientes() : void {
    this._peticionesHttp.listaClientes().subscribe({
      next : (data) => {
        if(data.error) {
          this._peticionesHttp.setRespuestaServer(data.message);
        } else {
          this.opcionesSelectClientes = data.data;
          this.valoresFiltradosClientes = this.opcionesSelectClientes.slice();
        }
      },
      error : (data) => {
        this._peticionesHttp.setRespuestaServer(data.message);
      }
    })
  }

  filter(filtro : string ): void {
    if(filtro == 'cliente') {
      const valorFiltradoCliente = this.inputCliente.nativeElement.value.toLowerCase();
      this.valoresFiltradosClientes = this.opcionesSelectClientes.filter(
        datosCliente => datosCliente.clientName.toLowerCase().includes(valorFiltradoCliente)
      );
    }
  }

  consultarEstadoCuentaCliente() : void {
    this._peticionesHttp.obtenerFacturasImpagas(this.formularioConsultarFacturasImpagas).subscribe({
      next: (data) => {
        if(data.error) {
          this._peticionesHttp.setRespuestaServer(data.message);
          return;
        }

        this.facturasImpagas = data.data;

        console.log(this.facturasImpagas);
      },
      error: (error) => {
        this._peticionesHttp.setRespuestaServer(error.message);
      }
    })
  }
}
