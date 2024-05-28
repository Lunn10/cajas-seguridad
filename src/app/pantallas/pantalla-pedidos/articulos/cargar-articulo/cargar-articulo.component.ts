import { Component } from '@angular/core';
import { EncabezadoComponent } from '../../../../components/encabezado/encabezado.component';
import { RespuestaServerComponent } from '../../../../components/respuesta-server/respuesta-server.component';
import { PeticionesHttpService } from '../../../../services/peticiones-http.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatStep, MatStepperModule } from '@angular/material/stepper';
import { ActivatedRoute } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';

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
    MatStep,
    MatRadioModule,
    MatTabsModule,
    MatSelectModule
  ],
  templateUrl: './cargar-articulo.component.html',
  styleUrl: './cargar-articulo.component.scss'
})
export class CargarArticuloComponent {
  formularioCargarArticulo : FormGroup;
  formularioCargarAccesorio : FormGroup;
  formularioCargarServicio : FormGroup;
  idArticulo : number = 0;
  listaArticulos : any[] = [];

  constructor(
    private _peticionesHttp : PeticionesHttpService,
    private form : FormBuilder,
    private _route : ActivatedRoute
  ) {
    this.obtenerArticulos();

    this.formularioCargarArticulo = this.form.group({
      idArticulo: [this.idArticulo],
      nombreArticulo: ['', Validators.required],
      nombreAnterior: ['', Validators.required],
      descripcion: ['', Validators.required],
      ancho: [0],
      alto: [0],
      profundidad: [0],
      tipoArticulo : ['ARTICULO']
    })

    this.formularioCargarAccesorio = this.form.group({
      idAccesorio: [this.idArticulo],
      nombreAccesorio : ['', Validators.required],
      descripcion : [''],
      articulos : new FormControl([]),
      tipoArticulo : ['ACCESORIO']
    })

    this.formularioCargarServicio = this.form.group({
      idServicio: [this.idArticulo],
      nombreServicio : ['', Validators.required],
      descripcion : ['', Validators.required],
      tipoArticulo : ['SERVICIO']
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

        if(datosArticulo.tipoArticulo == 'ARTICULO') {
          this.formularioCargarArticulo.patchValue({
            idArticulo: this.idArticulo,
            nombreArticulo: datosArticulo.nombre,
            nombreAnterior: datosArticulo.nombreAnterior,
            descripcion: datosArticulo.descripcion,
            ancho: datosArticulo.medidas.ancho,
            alto: datosArticulo.medidas.alto,
            profundidad: datosArticulo.medidas.profundidad,
            tipoArticulo: datosArticulo.tipoArticulo
          })
        } else if(datosArticulo.tipoArticulo == 'SERVICIO') {
          this.formularioCargarServicio.patchValue({
            idServicio: this.idArticulo,
            nombreServicio: datosArticulo.nombre,
            descripcion: datosArticulo.descripcion
          })
        } else if(datosArticulo.tipoArticulo == 'ACCESORIO') {
          this.formularioCargarAccesorio.patchValue({
            idAccesorio: this.idArticulo,
            nombreAccesorio: datosArticulo.nombre,
            descripcion: datosArticulo.descripcion,
            articulos: datosArticulo.relacionesArticulos
          })
        }
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

  cargarAccesorio() {
    if(!this.formularioCargarAccesorio.valid) {
      return;
    }

    this._peticionesHttp.crearAccesorio(this.formularioCargarAccesorio).subscribe({
      next: (data) => {
        this._peticionesHttp.setRespuestaServer(data.message);

        if(!data.error) {
          this.formularioCargarAccesorio.reset();
        }
      },
      error: (error) => {
        this._peticionesHttp.setRespuestaServer(error.message);
      }
    })
  }

  cargarServicio() {
    if(!this.formularioCargarServicio.valid) {
      return;
    }

    this._peticionesHttp.crearServicio(this.formularioCargarServicio).subscribe({
      next: (data) => {
        this._peticionesHttp.setRespuestaServer(data.message);

        if(!data.error) {
          this.formularioCargarServicio.reset();
        }
      },
      error: (error) => {
        this._peticionesHttp.setRespuestaServer(error.message);
      }
    })
  }

  obtenerArticulos() {
    this._peticionesHttp.listaArticulos().subscribe({
      next: (data) => {
        if(data.error) {
          this._peticionesHttp.setRespuestaServer(data.message);
        }

        this.listaArticulos = data.data;
      },
      error: (error) => {
        this._peticionesHttp.setRespuestaServer(error.message);
      }
    })
  }
}
