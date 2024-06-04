import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { EncabezadoComponent } from '../../../../components/encabezado/encabezado.component';
import { RespuestaServerComponent } from '../../../../components/respuesta-server/respuesta-server.component';
import { BotonCargarComponent } from '../../../../components/boton-cargar/boton-cargar.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PeticionesHttpService } from '../../../../services/peticiones-http.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { DateAdapter, MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-consultar-pedidos',
  standalone: true,
  imports: [
    CommonModule,
    EncabezadoComponent,
    RespuestaServerComponent,
    BotonCargarComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatCardModule,
    MatDatepickerModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './consultar-pedidos.component.html',
  styleUrl: './consultar-pedidos.component.scss'
})
export class ConsultarPedidosComponent {
  formularioConsultarPedidos : FormGroup;
  opcionesSelectClientes : any[] = [];
  valoresFiltradosClientes : any[] = [];
  opcionesSelectArticulos : any[] = [];
  valoresFiltradosArticulos : any[] = [];
  opcionesSelectTipoEstado : any[] = ['PENDIENTE', 'CUMPLIDO', 'ANULADO', 'NO CONFIRMADO'];
  valoresFiltradosTipoEstado : any[] = [];
  @ViewChild('inputCliente') inputCliente!: ElementRef<HTMLInputElement>;
  @ViewChild('inputArticulo') inputArticulo!: ElementRef<HTMLInputElement>;
  @ViewChild('inputEstado') inputEstado!: ElementRef<HTMLInputElement>;
  listaPedidos : any[] = [];

  constructor(
    private formBuilder : FormBuilder,
    private _peticionesHttp : PeticionesHttpService,
    private _adapter: DateAdapter<any>,
    @Inject(MAT_DATE_LOCALE) private _locale: string
  ) {
    this.formularioConsultarPedidos = this.formBuilder.group({
      idPedido: [''],
      cliente: [''],
      estado: [''],
      articulo: [''],
      fechaPedidoDesde: [''],
      fechaPedidoHasta: ['']
    });
    
    this.obtenerListaClientes();
    this.obtenerArticulos();
    this.valoresFiltradosTipoEstado = this.opcionesSelectTipoEstado.slice();
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

  obtenerArticulos() {
    this._peticionesHttp.listaArticulos().subscribe({
      next: (data) => {
        if(data.error) {
          this._peticionesHttp.setRespuestaServer(data.message);
        }

        this.opcionesSelectArticulos = data.data;
      },
      error: (error) => {
        this._peticionesHttp.setRespuestaServer(error.message);
      }
    })
  }

  filter(filtro : string ): void {
    if(filtro == 'cliente') {
      const valorFiltradoCliente = this.inputCliente.nativeElement.value.toLowerCase();
      this.valoresFiltradosClientes = this.opcionesSelectClientes.filter(
        datosCliente => datosCliente.clientName.includes(valorFiltradoCliente)
      );
    } else if(filtro == 'articulo') {
      const valorFiltradoArticulo = this.inputArticulo.nativeElement.value.toLowerCase();
      this.valoresFiltradosArticulos = this.opcionesSelectArticulos.filter(
        datosArticulo => datosArticulo.nombre.includes(valorFiltradoArticulo)
      );
    } else if(filtro == 'estado') {
      const valorFiltradoTipoEstado = this.inputEstado.nativeElement.value.toLowerCase();
      this.valoresFiltradosTipoEstado = this.opcionesSelectTipoEstado.filter(
        tipoEstado => tipoEstado.toLowerCase().includes(valorFiltradoTipoEstado)
      );
    }
  }

  consultarPedidos() {
    this._peticionesHttp.obtenerPedidos(this.formularioConsultarPedidos).subscribe({
      next: (data) => {
        if(data.error) {
          this._peticionesHttp.setRespuestaServer(data.message);
        }

        this.listaPedidos = data.data;
      },
      error: (error) => {
        this._peticionesHttp.setRespuestaServer(error.message);
      }
    })
  }
}

