import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EncabezadoComponent } from '../../../../components/encabezado/encabezado.component';
import { RespuestaServerComponent } from '../../../../components/respuesta-server/respuesta-server.component';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';

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
    MatCheckboxModule,
    MatCardModule
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
    private _peticionesHttp : PeticionesHttpService,
    private _route : ActivatedRoute
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

  

  ngOnInit() {
    this._route.params.subscribe( params => {
      if(params['id']) {
        this.idPedido = params['id'];
        this.obtenerPedido(params['id']);
      }
    })

    this.agregarArticulo();
  }

  private crearFormGroupArticulo(): FormGroup {
    return this.form.group({
      articulo: [0],
      cantidad: [0],
      accesorios: this.form.array([])
    });
  }

  get articulosCargados(): FormArray {
    return this.formularioCargarPedido.get('articulosCargados') as FormArray;
  }

  mostrarAccesorios(articuloId: number): boolean {
    const articulo = this.listaArticulos.find(articulo => articulo.id === articuloId);
    return articulo && articulo.tipoArticulo === 'ARTICULO';
  }

  verificarAccesoriosArticulo(index : number) {
    const articuloFormGroup = (this.formularioCargarPedido.get('articulosCargados') as FormArray).at(index);
    const articuloId = articuloFormGroup.value.articulo;
    const accesoriosFormArray = articuloFormGroup.get('accesorios') as FormArray;
    const articuloSeleccionado = this.listaArticulos.find(articulo => articulo.id === articuloId);

    accesoriosFormArray.clear();
    articuloSeleccionado.accesorios.forEach((accesorio: any) => {
      accesoriosFormArray.push(this.crearAccesorio(accesorio));      
    });
  
    this.verificarAgregarArticulo();
  }

  crearAccesorio(accesorio : any, estadoPorDefecto : boolean = false): FormGroup {
    return this.form.group({
      nombre: [accesorio.nombre, Validators.required],
      id: [accesorio.id, Validators.required],
      estado: [estadoPorDefecto]
    });
  }

  eliminarArticulo(indice : number) {
    this.articulosCargados.removeAt(indice);

    if(this.articulosCargados.length == 0) {
      this.agregarArticulo();
    }

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

  obtenerAccesoriosActuales(articuloActual : AbstractControl) : FormArray {
    return articuloActual.get('accesorios') as FormArray;
  }

  articuloActual(idArticulo : number) : any[] {
    const articuloSeleccionado = this.listaArticulos.find(articulo => articulo.id === idArticulo);
    return articuloSeleccionado.accesorios;
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

        let listaArticulos = data.data;

        listaArticulos.forEach(datosArticulo => {
          datosArticulo.accesorios = [];

          if(datosArticulo.relacionesArticulos) {
            datosArticulo.relacionesArticulos.forEach((idArticuloRelacion : number) => {
              let articuloRelacionado = listaArticulos.find(articulo => articulo.id === idArticuloRelacion);

              if (articuloRelacionado) {
                articuloRelacionado.accesorios.push(datosArticulo); 
              }
            });
          }
        });

        this.listaArticulos = listaArticulos;
      },
      error: (error) => {
        this._peticionesHttp.setRespuestaServer(error.message);
      }
    })
  }

  cargarPedido() {
    if(!this.formularioCargarPedido.valid) {
      return;
    }

    this._peticionesHttp.cargarPedido(this.formularioCargarPedido).subscribe({
      next: (data) => {
        if(!data.error) {
          this.formularioCargarPedido.reset();
        }
        
        this._peticionesHttp.setRespuestaServer(data.message);
      },
      error: (error) => {
        this._peticionesHttp.setRespuestaServer(error.message);
      }
    })
  }

  obtenerPedido(idPedido : number) {
    this._peticionesHttp.obtenerPedido(idPedido).subscribe({
      next: (data) => {
        if(data.error) {
          this._peticionesHttp.setRespuestaServer(data.message);
          return;
        }

        let datosPedido = data.data;
        let articulosPedidos : any[] = [];
        
        const datosCliente = this.opcionesSelectClientes.find(datosCliente => datosPedido.idCliente === datosCliente.id);

        this.formularioCargarPedido.patchValue({
          idPedido: this.idPedido,
          cliente: datosCliente.clientName,
          observaciones: datosPedido.observaciones,
          transporte: datosPedido.transporte,
          observacionesTransporte: datosPedido.observacionesTransporte,
          articulosCargados: articulosPedidos.slice()
        })

        const articulosCargadosArray = this.formularioCargarPedido.get('articulosCargados') as FormArray;
        articulosCargadosArray.clear();

        datosPedido.articulos.forEach((articuloPedido : {idArticulo : number; cantidad: number; accesorios : number[]}) => {
          const articuloFormGroup = this.crearFormGroupArticulo();
          const datosArticulo = this.listaArticulos.find(datosArticulo => datosArticulo.id == articuloPedido.idArticulo);

          articuloFormGroup.patchValue({
            articulo: articuloPedido.idArticulo,
            cantidad: articuloPedido.cantidad
          });

          const accesoriosSeleccionados = articuloPedido.accesorios;
        
          datosArticulo.accesorios.forEach((accesorioDisponible: any) => {
            const accesoriosFormArray = articuloFormGroup.get('accesorios') as FormArray;
            let datosAccesorio = this.listaArticulos.find(datosAccesorio => datosAccesorio.id === accesorioDisponible.id);
        
            const accesorioSeleccionado = accesoriosSeleccionados.find(idAccesorio => idAccesorio === datosAccesorio.id);
        
            if (!accesorioSeleccionado) {
              accesoriosFormArray.push(this.crearAccesorio(datosAccesorio, false));
            } else {
              accesoriosFormArray.push(this.crearAccesorio(datosAccesorio, true));
            }
          });

          articulosCargadosArray.push(articuloFormGroup);
        });

        this.verificarAgregarArticulo();
      },
      error: (error) => {
        this._peticionesHttp.setRespuestaServer(error.message);
      }
    })
  }
}
