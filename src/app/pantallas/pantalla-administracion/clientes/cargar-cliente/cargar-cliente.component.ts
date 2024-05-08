import { Component } from '@angular/core';
import { EncabezadoComponent } from '../../../../components/encabezado/encabezado.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-cargar-cliente',
  standalone: true,
  imports: [
    EncabezadoComponent,
    ReactiveFormsModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    MatCardModule
  ],
  templateUrl: './cargar-cliente.component.html',
  styleUrl: './cargar-cliente.component.scss'
})
export class CargarClienteComponent {
  formularioCargarCliente: FormGroup;
  mensajeServer : String = '';
  idCliente : Number = 0;

  constructor (
    private form : FormBuilder 
  ) {
    this.formularioCargarCliente = this.form.group({
      idCliente: [this.idCliente],
      nombreCliente: ['', Validators.required],
      nombreFantasiaCliente: ['', Validators.required],
      direccionCliente: ['', Validators.required],
      numeroDireccionCliente: ['', Validators.required]
    })
  }

  cargarCliente() {

  }
}
