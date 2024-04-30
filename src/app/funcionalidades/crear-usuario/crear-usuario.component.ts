import { Component, ElementRef, ViewChild} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { NgFor } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EncabezadoComponent } from '../../components/encabezado/encabezado.component';

@Component({
  selector: 'app-crear-usuario',
  standalone: true,
  imports: [
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    MatIconModule, 
    MatAutocompleteModule, 
    ReactiveFormsModule, 
    NgFor,
    EncabezadoComponent
  ],
  templateUrl: './crear-usuario.component.html',
  styleUrl: './crear-usuario.component.scss'
})
export class CrearUsuarioComponent {
  oculto : boolean = true;
  formularioCrearUsuario : FormGroup;
  opcionesSelect : string[] = ['Administrador', 'Producción', 'Administración'];

  constructor(
    private form : FormBuilder, 
  ) {
    this.formularioCrearUsuario = this.form.group({
      usuario : ['', Validators.required],
      password : ['', Validators.required],
      repetirPassword : ['', Validators.required],
      tipoUsuario : ['', Validators.required]
    })
    
    this.valoresFiltrados = this.opcionesSelect.slice()
  }

  @ViewChild('input') input!: ElementRef<HTMLInputElement>;
  valoresFiltrados: string[];

  filter(): void {
    const filterValue = this.input.nativeElement.value.toLowerCase();
    this.valoresFiltrados = this.opcionesSelect.filter(o => o.includes(filterValue));
  }

  crearUsuario() {
    console.log(this.formularioCrearUsuario.value);
  }
}
