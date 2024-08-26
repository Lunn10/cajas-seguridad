import { Component, OnInit } from '@angular/core';
import { RespuestaServerComponent } from '../../../../components/respuesta-server/respuesta-server.component';
import { EncabezadoComponent } from '../../../../components/encabezado/encabezado.component';
import { PeticionesHttpService } from '../../../../services/peticiones-http.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cargar-lista-precios',
  standalone: true,
  imports: [
    RespuestaServerComponent,
    EncabezadoComponent,
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  templateUrl: './cargar-lista-precios.component.html',
  styleUrl: './cargar-lista-precios.component.scss'
})
export class CargarListaPreciosComponent implements OnInit {
  listaArticulos : any[] = [];
  formularioCargarListaPrecios : FormGroup;

  constructor(
    private _peticionesHttp : PeticionesHttpService,
    private formBuilder : FormBuilder,
    private _route : ActivatedRoute
  ) {
    this.formularioCargarListaPrecios = this.formBuilder.group({
      idLista: [0],
      observaciones: [''],
      porcentajeAumento: [0],
      articulos: this.formBuilder.array([])
    })
  }

  ngOnInit() {
    this._route.params.subscribe( params => {
      const idLista = params['id'] ? params['id'] : 0;
      this.obtenerDatosListaPrecios(idLista).then(() => {
          this.obtenerArticulosConPrecios(idLista);
      });  
    })

    this.formularioCargarListaPrecios.get('porcentajeAumento')?.valueChanges.subscribe(porcentaje => {
      this.articulos.controls.forEach(articulo => {
        const precioActual = articulo.get('precio')?.value;
        const nuevoPrecio = precioActual + (precioActual * (porcentaje / 100));
        articulo.get('aumentoPersonalizado')?.setValue(porcentaje);
        articulo.get('precioActual')?.setValue(nuevoPrecio);
      });
    });
  }

  get articulos() : FormArray {
    return this.formularioCargarListaPrecios.get('articulos') as FormArray;
  }

  obtenerDatosListaPrecios(idLista: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if(idLista == 0) {
        resolve();
        return;
      }

      this._peticionesHttp.obtenerListaPrecios(idLista).subscribe({
        next: (data) => {
          this.formularioCargarListaPrecios.patchValue({
            observaciones: data.data.observaciones,
            porcentajeAumento: data.data.porcentaje ? data.data.porcentaje : 0,
            idLista: data.data.id
          });
  
          if (data.error) {
            this._peticionesHttp.setRespuestaServer(data.message);
          }

          resolve();
        },
        error: (error) => {
          this._peticionesHttp.setRespuestaServer(error.message);
          reject();
        }
      });
    });
  }

  cambiarValorArticulo(index : number) {
    const nuevoPrecio = this.articulos.controls[index].get('precio')?.value + (
      this.articulos.controls[index].get('precio')?.value * (
        this.articulos.controls[index].get('aumentoPersonalizado')?.value / 100
      ));

    this.articulos.controls[index].get('precioActual')?.setValue(
      nuevoPrecio
    )
  }
  

  obtenerArticulosConPrecios(idLista : number = 0) {
    this._peticionesHttp.listaArticulosConPrecios(idLista).subscribe({
      next: (data) => {
        if(data.error) {
          this._peticionesHttp.setRespuestaServer(data.message);
        }

        this.listaArticulos = data.data.articulos;

        this.listaArticulos.forEach(articulo => {
          let precioAnterior = 100 * articulo.precio / (100 + this.formularioCargarListaPrecios.get('porcentajeAumento')?.value)

          this.articulos.push(this.formBuilder.group({
            idArticulo: [articulo.id],
            nombre: [articulo.nombre],
            descripcion: [articulo.descripcion],
            precio: [precioAnterior],
            precioActual: [articulo.precio],
            aumentoPersonalizado: [0]
          }));
        });
      },
      error: (error) => {
        this._peticionesHttp.setRespuestaServer(error.message);
      }
    })
  }

  cargarListaPrecios() {
    if(!this.formularioCargarListaPrecios.valid) {
      return;
    }

    this._peticionesHttp.cargarListaPrecios(this.formularioCargarListaPrecios).subscribe({
      next: (data) => {        
        this._peticionesHttp.setRespuestaServer(data.message);
      },
      error: (error) => {
        this._peticionesHttp.setRespuestaServer(error.message);
      }
    })
  }
}
