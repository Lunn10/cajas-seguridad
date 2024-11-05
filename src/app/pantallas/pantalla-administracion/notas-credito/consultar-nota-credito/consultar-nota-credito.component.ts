import { Component, ElementRef, ViewChild } from '@angular/core';
import { EncabezadoComponent } from '../../../../components/encabezado/encabezado.component';
import { RespuestaServerComponent } from '../../../../components/respuesta-server/respuesta-server.component';
import { BotonCargarComponent } from '../../../../components/boton-cargar/boton-cargar.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DateAdapter, provideNativeDateAdapter } from '@angular/material/core';
import { PeticionesHttpService } from '../../../../services/peticiones-http.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-consultar-factura',
  standalone: true,
  imports: [
    EncabezadoComponent,
    RespuestaServerComponent,
    BotonCargarComponent,
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatCardModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatIconModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './consultar-nota-credito.component.html',
  styleUrl: './consultar-nota-credito.component.scss'
})
export class ConsultarNotaCreditoComponent {
  formularioConsultarNotaCredito : FormGroup;
  opcionesSelectClientes : any[] = [];
  valoresFiltradosClientes : any[] = [];
  @ViewChild('inputCliente') inputCliente!: ElementRef<HTMLInputElement>;

  notasCredito : any[] = [];

  constructor(
    private formBuilder : FormBuilder,
    private _peticionesHttp : PeticionesHttpService,
    private _adapter: DateAdapter<any>
  ) {
    this.formularioConsultarNotaCredito = this.formBuilder.group({
      cliente: [''],
      fechaNotaCreditoDesde: [''],
      fechaNotaCreditoHasta: [''],
      puntoVenta: [''],
      numeroNotaCredito: ['']
    })

    this.obtenerListaClientes();
    this._adapter.setLocale('es-AR');
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

  agregarCerosAdelante(cadena : string, cantidad : number) : string {
    cadena = cadena.toString();

    while(cadena.length < cantidad) {
      cadena = '0' + cadena;	
    }

    return cadena;
  }

  filter(filtro : string ): void {
    if(filtro == 'cliente') {
      const valorFiltradoCliente = this.inputCliente.nativeElement.value.toLowerCase();
      this.valoresFiltradosClientes = this.opcionesSelectClientes.filter(
        datosCliente => datosCliente.clientName.toLowerCase().includes(valorFiltradoCliente)
      );
    }
  }

  consultarNotasCredito() : void {
    if(!this.formularioConsultarNotaCredito.valid) {
      return;
    }

    this._peticionesHttp.consultarFacturas(this.formularioConsultarNotaCredito).subscribe({
      next: (data) => {
        if(data.error) {
          this._peticionesHttp.setRespuestaServer(data.message);
          return;
        }

        this.notasCredito = data.data;
      },
      error: (error) => {
        this._peticionesHttp.setRespuestaServer(error.message);
      }
    })
  }
}
