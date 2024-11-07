import { Component, ElementRef, ViewChild } from '@angular/core';
import { EncabezadoComponent } from '../../../../components/encabezado/encabezado.component';
import { RespuestaServerComponent } from '../../../../components/respuesta-server/respuesta-server.component';
import { BotonCargarComponent } from '../../../../components/boton-cargar/boton-cargar.component';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { PeticionesHttpService } from '../../../../services/peticiones-http.service';
import { DateAdapter, provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-consultar-nota-debito',
  standalone: true,
  imports: [
    EncabezadoComponent,
    RespuestaServerComponent,
    BotonCargarComponent,
    MatInputModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    CommonModule,
    MatDatepickerModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './consultar-nota-debito.component.html',
  styleUrl: './consultar-nota-debito.component.scss'
})
export class ConsultarNotaDebitoComponent {
  formularioConsultarNotaDebito : FormGroup;
  opcionesSelectClientes : any[] = [];
  valoresFiltradosClientes : any[] = [];
  @ViewChild('inputCliente') inputCliente!: ElementRef<HTMLInputElement>;

  notasDebito : any[] = [];

  constructor(
    private formBuilder : FormBuilder,
    private _peticionesHttp : PeticionesHttpService,
    private _adapter: DateAdapter<any>
  ) {
    this.formularioConsultarNotaDebito = this.formBuilder.group({
      cliente: [''],
      fechaNotaDebitoDesde: [''],
      fechaNotaDebitoHasta: [''],
      puntoVenta: [''],
      numeroNotaDebito: ['']
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

  consultarNotasDebito() : void {
    if(!this.formularioConsultarNotaDebito.valid) {
      return;
    }

    this._peticionesHttp.consultarNotasDebito(this.formularioConsultarNotaDebito).subscribe({
      next: (data) => {
        if(data.error) {
          this._peticionesHttp.setRespuestaServer(data.message);
          return;
        }

        this.notasDebito = data.data;
      },
      error: (error) => {
        this._peticionesHttp.setRespuestaServer(error.message);
      }
    })
  }
}

