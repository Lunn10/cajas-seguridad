import { Component, ElementRef, NgModule, OnInit, ViewChild } from '@angular/core';
import { EncabezadoComponent } from '../../../../components/encabezado/encabezado.component';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import {MatStepperModule} from '@angular/material/stepper';
import { MatAutocompleteModule } from '@angular/material/autocomplete'; 
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

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
    MatAutocompleteModule,
    MatTableModule
  ],
  templateUrl: './cargar-cliente.component.html',
  styleUrl: './cargar-cliente.component.scss'
})
export class CargarClienteComponent implements OnInit {
  formularioCargarCliente: FormGroup;
  mensajeServer : String = '';
  idCliente : Number = 0;
  opcionesSelectProvincias : any[] = [
    {
      id: 1,
      nombre: 'buenos aires'
    }, {
      id: 2,
      nombre: 'capital federal'
    }
  ];
  valoresFiltradosProvincias : any[] = [];
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

  columnasTablaContacto: string[] = ['nombre', 'telefono', 'celular', 'email'];

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
      cuit: ['', Validators.required],
      iva: ['', Validators.required],
      transporte: [''],
      observacionesTransporte: [''],
      contactos: this.form.array([])
    })

    this.agregarContacto();
    this.agregarContacto();
    this.agregarContacto();
    this.agregarContacto();
  }

  ngOnInit() {
    
  }

  get contactos(): FormArray {
    return this.formularioCargarCliente.get('contactos') as FormArray;
  }

  agregarContacto(): void {
    this.contactos.push(this.crearFormGroupContacto());
    console.log(this.formularioCargarCliente);
  }

  eliminarContacto(index: number): void {
    this.contactos.removeAt(index);
  }

  private crearFormGroupContacto(): FormGroup {
    return this.form.group({
      nombre: ['', Validators.required],
      telefono: [''],
      email: ['', Validators.email]
    });
  }

  filter(filtro : string ): void {
    if(filtro == 'provincias') {
      console.log(this.inputProvincia);
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
