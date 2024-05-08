import { Component, ElementRef, NgModule, ViewChild } from '@angular/core';
import { EncabezadoComponent } from '../../../../components/encabezado/encabezado.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import {MatStepperModule} from '@angular/material/stepper';
import { MatAutocompleteModule } from '@angular/material/autocomplete'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cargar-cliente',
  standalone: true,
  imports: [
    EncabezadoComponent,
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    MatCardModule,
    MatStepperModule,
    MatAutocompleteModule
  ],
  templateUrl: './cargar-cliente.component.html',
  styleUrl: './cargar-cliente.component.scss'
})
export class CargarClienteComponent {
  formularioCargarCliente: FormGroup;
  mensajeServer : String = '';
  idCliente : Number = 0;
  opcionesSelectProvincias : any[] = [];
  valoresFiltradosProvincias : any[] = [
    {
      id: 1,
      nombre: 'buenos aires'
    }, {
      id: 2,
      nombre: 'capital federal'
    }
  ];
  opcionesSelectTipoIVA : any[] = [
    {
      id: 1,
      nombre: 'consumidor final'
    }, {
      id: 2,
      nombre: 'exento'
    }, {
      id: 3,
      nombre: 'monotributo'
    }, {
      id: 4,
      nombre: 'responsable inscripto'
    }, {
      id: 5,
      nombre: 'responsable no inscripto'
    }
  ];
  valoresFiltradosTipoIVA : any[] = [];
  @ViewChild('inputProvincia') inputProvincia!: ElementRef<HTMLInputElement>;
  @ViewChild('inputIva') inputIva!: ElementRef<HTMLInputElement>;

  constructor (
    private form : FormBuilder 
  ) {
    this.formularioCargarCliente = this.form.group({
      idCliente: [this.idCliente],
      nombreCliente: ['', Validators.required],
      nombreFantasia: ['', Validators.required],
      direccion: ['', Validators.required],
      numeroDireccion: ['', Validators.required],
      provincia: ['', Validators.required],
      codigoPostal: ['', Validators.required],
      iva: ['', Validators.required]
    })
  }

  filter(filtro : string ): void {
    if(filtro == 'provincias') {
      const valorFiltradoProvincias = this.inputProvincia.nativeElement.value.toLowerCase();
      this.valoresFiltradosProvincias = this.opcionesSelectProvincias.filter(
        datosProvincia => datosProvincia.nombre.includes(valorFiltradoProvincias)
      );
    } else if(filtro == 'iva') {
      const valorFiltradoIVA = this.inputIva.nativeElement.value.toLowerCase();
      this.valoresFiltradosTipoIVA = this.opcionesSelectTipoIVA.filter(
        datosTipoIVA => datosTipoIVA.nombre.includes(valorFiltradoIVA)
      );
    }
  }

  cargarCliente() {
    console.log(this.formularioCargarCliente);
  }
}
