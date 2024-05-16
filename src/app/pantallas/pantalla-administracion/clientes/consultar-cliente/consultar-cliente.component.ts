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

@Component({
  selector: 'app-consultar-cliente',
  standalone: true,
  imports: [
    EncabezadoComponent,
    RespuestaServerComponent,
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule
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
    this.valoresFiltradosClientes = this.opcionesSelectClientes.slice();

    this.formularioConsultarCliente = this.form.group({
      idCliente : ['']
    })
  }

  filtrar( ): void {
    const valorFiltradoCliente = this.inputCliente.nativeElement.value.toLowerCase();
    this.valoresFiltradosClientes = this.opcionesSelectClientes.filter(
      datosCliente => datosCliente.clientName.includes(valorFiltradoCliente)
    );
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

  obtenerListaClientes() : void {
    this._peticionesHttp.listaClientes().subscribe({
      next : (data) => {
        if(data.error) {
          this._peticionesHttp.setRespuestaServer(data.message);
        } else {
          this.opcionesSelectClientes = data.data;
        }
      },
      error : (data) => {
        this._peticionesHttp.setRespuestaServer(data.message);
      }
    })
  }
}
