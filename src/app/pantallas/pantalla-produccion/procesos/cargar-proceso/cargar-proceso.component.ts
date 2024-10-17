import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { EncabezadoComponent } from '../../../../components/encabezado/encabezado.component';
import { RespuestaServerComponent } from '../../../../components/respuesta-server/respuesta-server.component';
import { PeticionesHttpService } from '../../../../services/peticiones-http.service';
import { Form, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-cargar-proceso',
  standalone: true,
  imports: [
    CommonModule,
    EncabezadoComponent,
    RespuestaServerComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule
  ],
  templateUrl: './cargar-proceso.component.html',
  styleUrl: './cargar-proceso.component.scss'
})
export class CargarProcesoComponent {
  listaArticulos : any [] = [];
  formularioCargarProceso: FormGroup;

  constructor (
    private _peticionesHttp : PeticionesHttpService,
    private formBuilder : FormBuilder,
    private _route : ActivatedRoute
  ) { 
    this.formularioCargarProceso = this.formBuilder.group({
      idProceso: [0],
      nombreProceso: ['', Validators.required],
      descripcion: ['', Validators.required],
      tipoProceso: ['', Validators.required],
      articulos: this.formBuilder.array([])
    });
  }

  get articulos() : FormArray {
    return this.formularioCargarProceso.get('articulos') as FormArray;
  }

  cambiarEstadoCheckbox(index : number) {
    const articuloControl = this.articulos.at(index); 
    const currentCheckedValue = articuloControl.get('checked')?.value; 
    articuloControl.get('checked')?.setValue(!currentCheckedValue);
  }

  cargarProcesoProduccion() : void {
    let datosProceso = {};

    this._peticionesHttp.cargarProcesoProduccion(datosProceso).subscribe({
      next: (data) => {
        this._peticionesHttp.setRespuestaServer(data.message);
      },
      error: (error) => {
        this._peticionesHttp.setRespuestaServer(error.message);
      }
    });
  }

  ngOnInit(): void {
    this.obtenerArticulos();
  }

  obtenerArticulos() {
    let filtros = {
      tipoArticulo: 'ARTICULO'
    }

    this._peticionesHttp.listaArticulos(filtros).subscribe({
      next: (data) => {
        this.listaArticulos = data.data;
        
        this.listaArticulos.forEach(articulo => {
          this.articulos.push(
            this.formBuilder.group({
              id: [articulo.id],
              nombre: [articulo.nombre],
              checked: [false],
              cantidad: [0]
            })
          )
        });

        console.log(this.articulos);
      },
      error: (error) => {
        this._peticionesHttp.setRespuestaServer(error.message);
      }
    });
  }
}
