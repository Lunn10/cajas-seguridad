import { Component, ElementRef, ViewChild } from '@angular/core';
import { EncabezadoComponent } from '../../../../components/encabezado/encabezado.component';
import { RespuestaServerComponent } from '../../../../components/respuesta-server/respuesta-server.component';
import { MatInputModule} from '@angular/material/input';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete'; 
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { PeticionesHttpService } from '../../../../services/peticiones-http.service';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { BotonCargarComponent } from '../../../../components/boton-cargar/boton-cargar.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-consultar-cliente',
  standalone: true,
  imports: [
    EncabezadoComponent,
    RespuestaServerComponent,
    BotonCargarComponent,
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './consultar-cliente.component.html',
  styleUrl: './consultar-cliente.component.scss'
})
export class ConsultarClienteComponent {
  opcionesSelectClientes : any[] = [];
  valoresFiltradosClientes : any[] = [];
  formularioConsultarCliente : FormGroup;
  datosCliente : any = null;
  @ViewChild('inputCliente') inputCliente!: ElementRef<HTMLInputElement>;

  constructor (
    private form : FormBuilder,
    private _peticionesHttp : PeticionesHttpService
  ) {
    this.obtenerListaClientes();

    this.formularioConsultarCliente = this.form.group({
      idCliente : ['']
    })
  }

  filtrar( ): void {
    const valorFiltradoCliente = this.inputCliente.nativeElement.value.toLowerCase();
    this.valoresFiltradosClientes = this.opcionesSelectClientes.filter(
      datosCliente => datosCliente.clientName.toLowerCase().includes(valorFiltradoCliente)
    );
  }

  formatearNumeroCelularParaWhatsapp(numeroCelular : string) {
    const numeroCelularFormateado = numeroCelular.replace(/\D/g, '');
    return numeroCelularFormateado;
  }

  obtenerDatosCliente() : void {
    if(!this.formularioConsultarCliente.valid) {
      return;
    }

    let idCliente : number = this.formularioConsultarCliente.get('idCliente')?.value;

    this._peticionesHttp.obtenerCliente(idCliente).subscribe({
      next: (data) => {
        if(data.error) {
          this._peticionesHttp.setRespuestaServer(data.message);
        }

        this.datosCliente = data.data;
      },
      error: (error) => {
        this._peticionesHttp.setRespuestaServer(error.message);
      }
    })
  }

  cambiarEstadoCliente(idCliente : number, estado : boolean) : void {
    this._peticionesHttp.cambiarEstadoCliente(idCliente, estado).subscribe({
      next : (data) => {
        this.obtenerDatosCliente();
        
        if(data.error) {
          this._peticionesHttp.setRespuestaServer(data.message);
        }
      },
      error : (data) => {
        this._peticionesHttp.setRespuestaServer(data.message);
      }
    })
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
}
