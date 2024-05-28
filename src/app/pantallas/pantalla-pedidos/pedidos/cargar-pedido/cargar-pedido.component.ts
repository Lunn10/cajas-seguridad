import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EncabezadoComponent } from '../../../../components/encabezado/encabezado.component';
import { RespuestaServerComponent } from '../../../../components/respuesta-server/respuesta-server.component';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PeticionesHttpService } from '../../../../services/peticiones-http.service';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-cargar-pedido',
  standalone: true,
  imports: [
    CommonModule,
    EncabezadoComponent,
    RespuestaServerComponent,
    ReactiveFormsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatCheckboxModule
  ],
  templateUrl: './cargar-pedido.component.html',
  styleUrl: './cargar-pedido.component.scss'
})
export class CargarPedidoComponent implements OnInit {
  formularioCargarPedido : FormGroup;
  idPedido : number = 0;
  listaArticulos : any[] = [];
  opcionesSelectClientes : any[] = [];
  valoresFiltradosClientes : any[] = [];
  articuloSeleccionado : any;
  mostrarAccesoriosArticulo: boolean[] = [];
  @ViewChild('inputCliente') inputCliente!: ElementRef<HTMLInputElement>;

  constructor(
    private form : FormBuilder,
    private _peticionesHttp : PeticionesHttpService
  ) {
    this.formularioCargarPedido = this.form.group({
      idPedido : [this.idPedido],
      cliente : ['', Validators.required],
      observaciones : [''],
      transporte : ['', Validators.required],
      observacionesTransporte : [''],
      articulosCargados : this.form.array([])
    })
    
    this.obtenerListaClientes();
    this.obtenerArticulos();
  }

  ngOnInit() : void {
    this.agregarArticulo();
  }

  mostrarAccesorios(articuloId: number): boolean {
    const articulo = this.listaArticulos.find(articulo => articulo.id === articuloId);
    return articulo && articulo.tipoArticulo === 'ARTICULO';
/*
    let listaAccesorios : any[] = [];
    
    this._peticionesHttp.listaAccesorios(articuloId).subscribe({
      next : (data) => {
        if(data.error) {
          this._peticionesHttp.setRespuestaServer(data.message);
        } else {
          console.log(data);

          listaAccesorios = data.data;
        }
      },
      error : (data) => {
        this._peticionesHttp.setRespuestaServer(data.message);
      }
    })

    return listaAccesorios;*/
  }

  verificarAccesoriosArticulo(index : number) {
    const tipoArticuloSeleccionado = this.listaArticulos.find( 
      articulo => articulo.id === this.articulosCargados.controls[index].get('articulo')?.value
    )?.tipoArticulo;
    
    this.mostrarAccesoriosArticulo[index] = tipoArticuloSeleccionado === 'ARTICULO';

    this.verificarAgregarArticulo();
  }

  verificarAgregarArticulo() {
    let agregarArticulo : boolean = true;
    
    this.articulosCargados.controls.forEach(articuloCargado => {
      if(articuloCargado.get('articulo')?.value == '') {
        agregarArticulo = false;
        return;
      }
    })

    if(agregarArticulo) {
      this.agregarArticulo();
    }
  }

  agregarArticulo(): void {
    this.articulosCargados.push(this.crearFormGroupArticulo());
  }

  private crearFormGroupArticulo(): FormGroup {
    return this.form.group({
      articulo: [0],
      cantidad: [0]
    });
  }

  get articulosCargados(): FormArray {
    return this.formularioCargarPedido.get('articulosCargados') as FormArray;
  }

  obtenerListaClientes() : void {
    this._peticionesHttp.listaClientes().subscribe({
      next : (data) => {
        if(data.error) {
          this._peticionesHttp.setRespuestaServer(data.message);
        } else {
          this.opcionesSelectClientes = data.data;
          this.valoresFiltradosClientes = this.opcionesSelectClientes.slice();
        }
      },
      error : (data) => {
        this._peticionesHttp.setRespuestaServer(data.message);
      }
    })
  }

  
  filter(filtro : string ): void {
    if(filtro == 'cliente') {
      const valorFiltradoCliente = this.inputCliente.nativeElement.value.toLowerCase();
      this.valoresFiltradosClientes = this.opcionesSelectClientes.filter(
        datosCliente => datosCliente.stateName.includes(valorFiltradoCliente)
      );
    }
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
