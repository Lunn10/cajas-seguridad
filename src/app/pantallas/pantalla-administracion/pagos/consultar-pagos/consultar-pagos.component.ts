import { Component, ElementRef, ViewChild } from '@angular/core';
import { EncabezadoComponent } from '../../../../components/encabezado/encabezado.component';
import { RespuestaServerComponent } from '../../../../components/respuesta-server/respuesta-server.component';
import { BotonCargarComponent } from '../../../../components/boton-cargar/boton-cargar.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { PeticionesHttpService } from '../../../../services/peticiones-http.service';
import { DateAdapter, provideNativeDateAdapter } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-consultar-pagos',
  standalone: true,
  imports: [
    EncabezadoComponent,
    RespuestaServerComponent,
    BotonCargarComponent,
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatListModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './consultar-pagos.component.html',
  styleUrl: './consultar-pagos.component.scss'
})
export class ConsultarPagosComponent {
  opcionesSelectClientes : any[] = [];
  valoresFiltradosClientes : any[] = [];
  formularioConsultarCobranzas : FormGroup;
  @ViewChild('inputCliente') inputCliente!: ElementRef<HTMLInputElement>;
  listaCobranzas : any[] = [];

  constructor(
    private formBuilder : FormBuilder,
    private _peticionesHttp : PeticionesHttpService,
    private _adapter: DateAdapter<any>,
  ) {
    this.formularioConsultarCobranzas = this.formBuilder.group({
      cliente: [''],
      fechaDesde: [''],
      fechaHasta: ['']
    });
    
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

  filter(filtro : string ): void {
    if(filtro == 'cliente') {
      const valorFiltradoCliente = this.inputCliente.nativeElement.value.toLowerCase();
      this.valoresFiltradosClientes = this.opcionesSelectClientes.filter(
        datosCliente => datosCliente.clientName.toLowerCase().includes(valorFiltradoCliente)
      );
    }
  }

  consultarCobranzas() {
    if(!this.formularioConsultarCobranzas.valid) {
      return;
    }

    if(this.formularioConsultarCobranzas.get('cliente')?.value == '' &&
       this.formularioConsultarCobranzas.get('fechaDesde')?.value == '' &&
       this.formularioConsultarCobranzas.get('fechaHasta')?.value == ''
    ) {
      this._peticionesHttp.setRespuestaServer('Debe indicar algún filtro');
      return;
    }

    this._peticionesHttp.consultarCobranzas(this.formularioConsultarCobranzas).subscribe({
      next: (data) => {
        if(data.error) {
          this._peticionesHttp.setRespuestaServer(data.message);
        }

        this.listaCobranzas = data.data;
      },
      error: (error) => {
        this._peticionesHttp.setRespuestaServer(error.message);
      }
    })
  }
}
