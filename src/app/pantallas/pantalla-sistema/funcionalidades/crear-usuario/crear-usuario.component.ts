import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatError, MatFormFieldModule} from '@angular/material/form-field';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { NgFor, NgIf } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EncabezadoComponent } from '../../../../components/encabezado/encabezado.component';
import { PeticionesHttpService } from '../../../../services/peticiones-http.service';
import { RespuestaServerComponent } from '../../../../components/respuesta-server/respuesta-server.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-crear-usuario',
  standalone: true,
  imports: [
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    MatIconModule, 
    MatError,
    MatAutocompleteModule,
    MatCardModule, 
    ReactiveFormsModule, 
    NgFor,
    NgIf,
    EncabezadoComponent,
    RespuestaServerComponent
  ],
  templateUrl: './crear-usuario.component.html',
  styleUrl: './crear-usuario.component.scss'
})
export class CrearUsuarioComponent implements OnInit {
  oculto : boolean = true;
  formularioCrearUsuario : FormGroup;
  opcionesSelect : string[] = ['Administrador', 'Producción', 'Administración'];
  @ViewChild('input') input!: ElementRef<HTMLInputElement>;
  mensajeServer : String = '';
  valoresFiltrados: string[];

  datosUsuario = {
    usuario: '',
    password: '',
    tipoUsuario: '',
    idUser: 0
  }

  constructor(
    private form : FormBuilder, 
    private _peticionesHttp : PeticionesHttpService,
    private _route : ActivatedRoute
  ) {
    this.formularioCrearUsuario = this.form.group({
      usuario : ['', Validators.required],
      password : ['', Validators.required],
      repetirPassword : ['', [Validators.required, this.passwordMatchValidator.bind(this)] ],
      tipoUsuario : ['', Validators.required]
    })
    
    this.valoresFiltrados = this.opcionesSelect.slice()
  }

  ngOnInit() {
    this._route.params.subscribe( params => {
      this.datosUsuario.idUser = params['idUser'];
    })
  }

  resetearCampoConfirmacion() : void {
    this.formularioCrearUsuario?.patchValue({repetirPassword: ""});
  }

  mostrarOcultarPassword() : void {
    this.oculto = !this.oculto;
  }

  passwordMatchValidator(control : FormControl) {
    let password : String = '';
    let repetirPassword : String = '';

    if(this.formularioCrearUsuario?.get('password')?.value) {
      password = this.formularioCrearUsuario.get('password')?.value;
    }

    if(this.formularioCrearUsuario?.get('repetirPassword')?.value) {
      repetirPassword = this.formularioCrearUsuario.get('repetirPassword')?.value;
    }

    if (password !== repetirPassword) {
      return { notEqual: true };
    } else {
      return null;
    }
  }

  filter(): void {
    const filterValue = this.input.nativeElement.value.toLowerCase();
    this.valoresFiltrados = this.opcionesSelect.filter(o => o.includes(filterValue));
  }

  crearUsuario() {
    if(!this.formularioCrearUsuario.valid) {
      return;
    }

    this._peticionesHttp.crearUsuario(this.formularioCrearUsuario).subscribe({
      next : (data) => {
        this.mostrarMensajeServer(data.message);
      },
      error : (data) => {
        this.mostrarMensajeServer(data.message);
      }
    });
  }

  mostrarMensajeServer(mensaje : String) : void {
    this.mensajeServer = mensaje;
    
    setTimeout(
      () => {
        this.mensajeServer = '';
      }, 3000);
  }
}
