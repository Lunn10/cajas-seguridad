import { Component, OnInit } from '@angular/core';
import { EncabezadoComponent } from '../../../../components/encabezado/encabezado.component';
import { RespuestaServerComponent } from '../../../../components/respuesta-server/respuesta-server.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PeticionesHttpService } from '../../../../services/peticiones-http.service';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatError, MatFormFieldModule} from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-crear-tipo-usuario',
  standalone: true,
  imports: [
    EncabezadoComponent,
    RespuestaServerComponent,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    MatError,
  ],
  templateUrl: './crear-tipo-usuario.component.html',
  styleUrl: './crear-tipo-usuario.component.scss'
})
export class CrearTipoUsuarioComponent {
  mensajeServer : String = '';
  formularioCrearTipoUsuario : FormGroup;

  constructor(
    private form : FormBuilder, 
    private _peticionesHttp : PeticionesHttpService,
    private _route : ActivatedRoute
  ) {
    this.formularioCrearTipoUsuario = this.form.group({
      tipoUsuario : ['', Validators.required]
    })
  }

  ngOnInit() {
    this.formularioCrearTipoUsuario.reset();

    this._route.params.subscribe( params => {
      if(params['idUser']) {
        this.obtenerTipoUsuario(params['idType']);
      }
    })
  }

  crearTipoUsuario() : void {
    
  }

  obtenerTipoUsuario(idType : Number) : void {
    this._peticionesHttp.obtenerTipoUsuario(idType).subscribe({
      next: (data) => {
        if(data.error) {
          this.mostrarMensajeServer(data.message);
          return;
        }

        let datosTipoUsuario = data.data[0];

        this.formularioCrearTipoUsuario.setValue({
          tipoUsuario: datosTipoUsuario.type
        })
      },
      error: (error) => {
        this.mostrarMensajeServer(error.message);
      }
    })
  }

  mostrarMensajeServer(mensaje : String) : void {
    this.mensajeServer = mensaje;
    
    setTimeout(
      () => {
        this.mensajeServer = '';
      }, 3000);
  }
}
