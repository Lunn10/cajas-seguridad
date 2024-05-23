import { Component } from '@angular/core';
import { EncabezadoComponent } from '../../../../components/encabezado/encabezado.component';
import { RespuestaServerComponent } from '../../../../components/respuesta-server/respuesta-server.component';
import { PeticionesHttpService } from '../../../../services/peticiones-http.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatStep, MatStepperModule } from '@angular/material/stepper';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cargar-articulo',
  standalone: true,
  imports: [
    EncabezadoComponent,
    RespuestaServerComponent,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatStepperModule,
    MatStep
  ],
  templateUrl: './cargar-articulo.component.html',
  styleUrl: './cargar-articulo.component.scss'
})
export class CargarArticuloComponent {
  formularioCargarArticulo : FormGroup;
  idArticulo : number = 0;

  constructor(
    private _peticionesHttp : PeticionesHttpService,
    private form : FormBuilder,
    private _route : ActivatedRoute
  ) {
    this.formularioCargarArticulo = this.form.group({
      idArticulo: [this.idArticulo],
      nombreArticulo: ['', Validators.required],
      nombreAnterior: ['', Validators.required],
      descripcion: ['', Validators.required],
      ancho: [0],
      alto: [0],
      profundidad: [0]
    })
  }

  ngOnInit() {
    this._route.params.subscribe( params => {
      if(params['id']) {
        this.obtenerArticulo(params['id']);
        this.idArticulo = params['id'];
      }
    })
  }

  obtenerArticulo(idArticulo : number) {
    this._peticionesHttp.obtenerArticulo(idArticulo).subscribe({
      next: (data) => {
        if(data.error) {
          this._peticionesHttp.setRespuestaServer(data.message);
        }

        let datosArticulo = data.data;

        this.formularioCargarArticulo.patchValue({
          idArticulo: this.idArticulo,
          nombreArticulo: datosArticulo.nombre,
          nombreAnterior: datosArticulo.nombreAnterior,
          descripcion: datosArticulo.descripcion,
          ancho: datosArticulo.medidas.ancho,
          alto: datosArticulo.medidas.alto,
          profundidad: datosArticulo.medidas.profundidad
        })
      },
      error: (error) => {
        this._peticionesHttp.setRespuestaServer(error.message);
      }
    })
  }

  cargarArticulo() {
    if(!this.formularioCargarArticulo.valid) {
      return;
    }

    this._peticionesHttp.crearArticulo(this.formularioCargarArticulo).subscribe({
      next: (data) => {
        this._peticionesHttp.setRespuestaServer(data.message);

        if(!data.error) {
          this.formularioCargarArticulo.reset();
        }
      },
      error: (error) => {
        this._peticionesHttp.setRespuestaServer(error.message);
      }
    })
  }
}
