import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EncabezadoComponent } from '../../../../components/encabezado/encabezado.component';
import { RespuestaServerComponent } from '../../../../components/respuesta-server/respuesta-server.component';
import { PeticionesHttpService } from '../../../../services/peticiones-http.service';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardActions, MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, provideNativeDateAdapter } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-cargar-factura',
  standalone: true,
  imports: [
    EncabezadoComponent,
    RespuestaServerComponent,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardActions,
    MatCardModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatIconModule,
    MatDatepickerModule,
    MatSelectModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './cargar-factura.component.html',
  styleUrl: './cargar-factura.component.scss'
})
export class CargarFacturaComponent implements OnInit {
  formularioCargarFactura : FormGroup;
  listaArticulos : any[] = [];
  listaClientes : any[] = [];
  valoresFiltradosClientes : any[] = [];
  valoresFiltradosArticulos : any[] = [];
  @ViewChild('inputCliente') inputCliente!: ElementRef<HTMLInputElement>;
  datosSubtotalFactura : any = {
    subtotal: 0.0,
    IVA: 0.0,
    subtotalIVA: 0.0,
    subtotalDescuento: 0.0,
    percepcionIIBB: 0.0,
    totalNeto: 0.0
  }

  constructor(
    private _peticionesHttp : PeticionesHttpService,
    private formBuilder : FormBuilder,
    private _adapter: DateAdapter<any>
  ) {
    this.formularioCargarFactura = this.formBuilder.group({
      cae: [0, Validators.required],
      descuento: [0],
      cliente: ['', Validators.required],
      observaciones: ['', Validators.required],
      fecha: ['', Validators.required],
      puntoVenta: ['', Validators.required],
      pedidos: this.formBuilder.array([]),
      articulos: this.formBuilder.array([])
    });
  }

  ngOnInit() {
    this.obtenerDatosListaPrecios();
    this.obtenerListaClientes();

    this.verificarAgregarFilaPedidos();
    this.verificarAgregarFilaArticulos();

    this.formularioCargarFactura.valueChanges.subscribe(() => {
      this.recalcularResultadoFactura();
    })

    this._adapter.setLocale('es-AR');
  }

  get articulos(): FormArray {
    return this.formularioCargarFactura.get('articulos') as FormArray;
  }

  get pedidos(): FormArray {
    return this.formularioCargarFactura.get('pedidos') as FormArray;
  }

  verificarAgregarFilaPedidos() : void {
    let agregarPedido : boolean = true;
    
    this.pedidos.controls.forEach(pedido => {
      if(pedido.get('idPedido')?.value == '') {
        agregarPedido = false;
        return;
      }
    })

    if(agregarPedido) {
      this.agregarPedido();
    }
  }

  verificarAgregarFilaArticulos() : void {
    let agregarArticulo : boolean = true;
    
    this.articulos.controls.forEach(articulo => {
      if(articulo.get('nombreArticulo')?.value == '') {
        agregarArticulo = false;
        return;
      }
    })

    if(agregarArticulo) {
      this.agregarArticulo();
    }
  }
  
  agregarArticulo() : void {
    this.articulos.push(
      this.formBuilder.group({
        cantidad: [null, Validators.min(0)],
        idArticulo: [0],
        nombreArticulo: [''],
        descripcion: [''],
        precio: [0.0],
        precioFormateado: ['$0.00'],
        descuento: [0],
        esServicio: false
      })
    );
  }
  
  agregarPedido() : void {
    this.pedidos.push(
      this.formBuilder.group({
        idPedido: [''],
        cliente: [''],
        observaciones: ['']
      })
    );
  }

  eliminarArticulo(index : number) : void {
    this.articulos.removeAt(index);

    if(this.articulos.length == 0) {
      this.agregarArticulo();
    }

    this.verificarAgregarFilaArticulos();
  }

  eliminarPedido(index : number) : void {
    this.pedidos.removeAt(index);

    if(this.pedidos.length == 0) {
      this.agregarPedido();
    }

    this.verificarAgregarFilaPedidos();
  }
  
  filter(filtro : string, index? : number , event? : Event ): void {
    if(filtro == 'cliente') {
      const valorFiltradoCliente = this.inputCliente.nativeElement.value.toLowerCase();
      this.valoresFiltradosClientes = this.listaClientes.filter(
        datosCliente => datosCliente.clientName.toLowerCase().includes(valorFiltradoCliente)
      );
    } else if(filtro == 'articulo') {
      const valorFiltradoArticulo = (event?.target as HTMLInputElement).value.toLowerCase();
      this.valoresFiltradosArticulos = this.listaArticulos.filter(
        datosArticulo => datosArticulo.nombre.toLowerCase().includes(valorFiltradoArticulo)
      );
    }
  }

  obtenerDatosPedidos() {
    this.articulos.clear();

    this.pedidos.controls.forEach(datosPedidos => {
      let idPedidoIngresado = datosPedidos.get('idPedido')?.value;

      if(idPedidoIngresado == '') {
        return;
      }

      this._peticionesHttp.obtenerPedido(idPedidoIngresado).subscribe({
        next: (data) => {
          if(data.error) {
            this._peticionesHttp.setRespuestaServer(data.message);
          } else {
            let datosCliente = this.listaClientes.find(cliente => cliente.id === data.data.idCliente);

            datosPedidos.get('observaciones')?.setValue(data.data.observaciones);
            datosPedidos.get('cliente')?.setValue(
              datosCliente.clientName
            );
            
            data.data.articulos.forEach((articuloPedido : any) => {
              let datosArticulo = this.listaArticulos.find(articulo => articulo.id === articuloPedido.idArticulo);

              this.articulos.push(
                this.formBuilder.group({
                  cantidad: [articuloPedido.cantidad],
                  idArticulo: [articuloPedido.idArticulo],
                  nombreArticulo: [datosArticulo.nombre],
                  descripcion: [datosArticulo.descripcion],
                  precio: [datosArticulo.precio],
                  precioFormateado: [this.formatearValorAPrecio(datosArticulo.precio)],
                  descuento: [0],
                  esServicio: articuloPedido.tipoArticulo == 'SERVICIO'
                })
              );
            });
          }
        },
        error: (error) => {
          this._peticionesHttp.setRespuestaServer(error.message);
        }
      })
    })
  }

  obtenerDatosAdicionales(index : number) {
    const nombreArticuloSeleccionado = this.articulos.controls[index].get('nombreArticulo')?.value.toLowerCase();
    const datosArticulo = this.listaArticulos.find(articulo => articulo.nombre.toLowerCase() === nombreArticuloSeleccionado);
    this.articulos.controls[index].get('descripcion')?.setValue(datosArticulo.descripcion);
    this.articulos.controls[index].get('precio')?.setValue(datosArticulo.precio);
    this.articulos.controls[index].get('idArticulo')?.setValue(datosArticulo.id);
    this.articulos.controls[index].get('esServicio')?.setValue(datosArticulo.tipoArticulo == 'SERVICIO');
    this.articulos.controls[index].get('precioFormateado')?.setValue(this.formatearValorAPrecio(datosArticulo.precio));

    this.verificarAgregarFilaArticulos();
  }

  formatearValorAPrecio(precio : number) {
    return precio.toLocaleString('es-AR');
  }

  recalcularResultadoFactura() {
    let subtotalFactura = 0.0;
    const descuento = this.formularioCargarFactura.get('descuento')?.value;
    
    this.articulos.controls.forEach((articuloAFacturar) => {
      const cantidadArticulo = articuloAFacturar.get('cantidad')?.value ? parseInt(articuloAFacturar.get('cantidad')?.value) : 0;
      const precioArticulo = articuloAFacturar.get('precio')?.value ? parseFloat(articuloAFacturar.get('precio')?.value) : 0;

      subtotalFactura += cantidadArticulo * precioArticulo;
    });

    this.datosSubtotalFactura.subtotal = subtotalFactura;
    this.datosSubtotalFactura.subtotalDescuento = subtotalFactura - subtotalFactura * descuento / 100;
    this.datosSubtotalFactura.IVA = this.datosSubtotalFactura.subtotalDescuento * 0.21;
    this.datosSubtotalFactura.totalNeto = subtotalFactura * 1.21 + this.datosSubtotalFactura.percepcionIIBB;
  }

  obtenerDatosListaPrecios() {
    this._peticionesHttp.listaArticulosConPrecios(0).subscribe({
      next: (data) => {
        if (data.error) {
          this._peticionesHttp.setRespuestaServer(data.message);
        } else {
          this.listaArticulos = data.data.articulos;
        }
      },
      error: (error) => {
        this._peticionesHttp.setRespuestaServer(error.message);
      }
    });
  }

  obtenerListaClientes() : void {
    this._peticionesHttp.listaClientes().subscribe({
      next : (data) => {
        if(data.error) {
          this._peticionesHttp.setRespuestaServer(data.message);
        } else {
          this.listaClientes = data.data;
          this.valoresFiltradosClientes = this.listaClientes.slice();
        }
      },
      error : (data) => {
        this._peticionesHttp.setRespuestaServer(data.message);
      }
    })
  }

  obtenerUltimoCae() {
    const datosCliente = this.listaClientes.find(cliente => cliente.clientName == this.formularioCargarFactura.get('cliente')?.value);
    const puntoVenta = this.formularioCargarFactura.get('puntoVenta')?.value;

    if(!datosCliente || !puntoVenta) {
      return;
    }

    let datosEnvio = {
      comprobante: '',
      puntoVenta: puntoVenta
    }
    
    if(datosCliente.ivaType == 'RESPONSABLE INSCRIPTO') {
      datosEnvio.comprobante = 'FACTURA A';
    } else if(datosCliente.ivaType == 'MONOTRIBUTO' || datosCliente.ivaType == 'CONSUMIDOR FINAL') {
      datosEnvio.comprobante = 'FACTURA B';
    }

    this._peticionesHttp.obtenerUltimoCAE(datosEnvio).subscribe({
      next: (data) => {
        if(data.error) {
          this._peticionesHttp.setRespuestaServer(data.message);
          return;
        }

        this.formularioCargarFactura.patchValue({
          cae: parseInt(data.data.ultimoIdCAE) + 1
        });
      },
      error: (error) => {
        this._peticionesHttp.setRespuestaServer(error.message);
      }
    })
  }

  cargarFactura() {    
    if(!this.formularioCargarFactura.valid) {
      return;
    }

    let pedidosFacturados : any[] = [];
    let articulosFacturados : any[] = [];

    this.formularioCargarFactura.value.pedidos.forEach((datosPedido : {idPedido : number; } ) => {
      if(datosPedido.idPedido) {
        pedidosFacturados.push(datosPedido.idPedido);
      }
    });

    let filaArticulo : number = 1;
    let errorArticulos : boolean = false;

    this.formularioCargarFactura.value.articulos.forEach((datosArticulo : {cantidad : number; idArticulo: number; precio: number; esServicio: boolean}) => {
      if(!datosArticulo.idArticulo && datosArticulo.cantidad == null) {
        return;
      }

      if(datosArticulo.idArticulo == 0) {
        errorArticulos = true;
        this._peticionesHttp.setRespuestaServer('No se indicó un artículo en la fila ' + filaArticulo);
      }

      if(datosArticulo.cantidad == null) {
        errorArticulos = true;
        this._peticionesHttp.setRespuestaServer('No se indicó la cantidad en la fila ' + filaArticulo);
      }

      let articuloFacturado = {
        idArticulo: datosArticulo.idArticulo,
        cantidad: datosArticulo.cantidad,
        precio: datosArticulo.precio,
        esServicio: datosArticulo.esServicio
      };

      articulosFacturados.push(articuloFacturado);

      filaArticulo++;
    });

    if(errorArticulos) {
      return;
    }

    let data = {
      cae: this.formularioCargarFactura.value.cae,
      descuento: this.formularioCargarFactura.value.descuento,
      cliente: this.formularioCargarFactura.value.cliente,
      fecha: this.formularioCargarFactura.value.fecha,
      puntoVenta: this.formularioCargarFactura.value.puntoVenta,
      idCliente: this.obtenerIdClienteSegunNombre(),
      observaciones: this.formularioCargarFactura.value.observaciones,
      pedidosFacturados: pedidosFacturados,
      articulosFacturados: articulosFacturados,
      resultadoFactura: this.datosSubtotalFactura
    };

    this._peticionesHttp.cargarFactura(data).subscribe({
      next: (data) => {
        if(!data.error) {
          this.formularioCargarFactura.reset();          
        }

        this._peticionesHttp.setRespuestaServer(data.message);
      },
      error: (error) => {
        this._peticionesHttp.setRespuestaServer(error.message);
      }
    })
  }

  obtenerIdClienteSegunNombre() : number {
    let idCliente : number = 0;

    const datosCliente = this.listaClientes.find(cliente => cliente.clientName.toLowerCase() === this.formularioCargarFactura.value.cliente.toLowerCase());

    if(datosCliente) {
      idCliente = datosCliente.id;
    }

    return idCliente;
  }
}
