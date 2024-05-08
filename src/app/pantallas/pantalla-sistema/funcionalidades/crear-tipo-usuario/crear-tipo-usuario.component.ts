import { Component } from '@angular/core';
import { EncabezadoComponent } from '../../../../components/encabezado/encabezado.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PeticionesHttpService } from '../../../../services/peticiones-http.service';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatError, MatFormFieldModule} from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { RespuestaServerComponent } from '../../../../components/respuesta-server/respuesta-server.component';

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
  mensajeServer : string = '';
  formularioCrearTipoUsuario : FormGroup;
  idTipoUsuario : Number = 0;

  constructor(
    private form : FormBuilder, 
    private _peticionesHttp : PeticionesHttpService,
    private _route : ActivatedRoute
  ) {
    this.formularioCrearTipoUsuario = this.form.group({
      idTipoUsuario : [this.idTipoUsuario],
      tipoUsuario : ['', Validators.required]
    })
  }

  ngOnInit() {
    this.formularioCrearTipoUsuario.reset();
    this.formularioCrearTipoUsuario.patchValue({idTipoUsuario : this.idTipoUsuario});

    this._route.params.subscribe( params => {
      if(params['idType']) {
        this.idTipoUsuario = params['idType'];
        this.obtenerTipoUsuario(params['idType']);
      }
    })
  }

  crearTipoUsuario() : void {
    if(!this.formularioCrearTipoUsuario.valid) {
      return;
    }

    this._peticionesHttp.crearTipoUsuario(this.formularioCrearTipoUsuario).subscribe({
      next : (data) => {
        if(!data.error) {
          this.formularioCrearTipoUsuario.reset();
          this.formularioCrearTipoUsuario.patchValue({idTipoUsuario : this.idTipoUsuario});
        }

        this.mostrarMensajeServer(data.message);
      },
      error : (data) => {
        this.mostrarMensajeServer(data.message);
      }
    });
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
          idTipoUsuario: this.idTipoUsuario,
          tipoUsuario: datosTipoUsuario.role
        })
      },
      error: (error) => {
        this.mostrarMensajeServer(error.message);
      }
    })
  }

  mostrarMensajeServer(mensaje : string) : void {
    this._peticionesHttp.setRespuestaServer(mensaje);
  }
}
