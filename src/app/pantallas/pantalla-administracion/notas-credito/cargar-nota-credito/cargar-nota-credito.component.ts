import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EncabezadoComponent } from '../../../../components/encabezado/encabezado.component';
import { RespuestaServerComponent } from '../../../../components/respuesta-server/respuesta-server.component';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PeticionesHttpService } from '../../../../services/peticiones-http.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, provideNativeDateAdapter } from '@angular/material/core';

interface Comprobante {
  id: number;
  tipo: string;
  valor: number;
}

@Component({
  selector: 'app-cargar-nota-credito',
  standalone: true,
  imports: [
    EncabezadoComponent,
    RespuestaServerComponent,
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './cargar-nota-credito.component.html',
  styleUrl: './cargar-nota-credito.component.scss'
})
export class CargarNotaCreditoComponent implements OnInit {
  formularioCargarnotaCredito : FormGroup;
  listaClientes : any[] = [];
  valoresFiltradosClientes : any[] = [];
  datosSubtotalNotaCredito : any = {
    subtotal: 0.0,
    IVA: 0.0,
    subtotalIVA: 0.0,
    totalNeto: 0.0
  };
  @ViewChild('inputCliente') inputCliente!: ElementRef<HTMLInputElement>;
  porcentajeIvaCliente : number = 0;
  comprobantes: Comprobante[] = [
    { id: 1, tipo: 'FACTURA A', valor: 1 },
    { id: 2, tipo: 'NOTA DEBITO A', valor: 2 },
    { id: 3, tipo: 'NOTA CREDITO A', valor: 3 },
    { id: 4, tipo: 'RECIBO A', valor: 4 },
    { id: 5, tipo: 'FACTURA B', valor: 6 },
    { id: 6, tipo: 'NOTA DEBITO B', valor: 7 },
    { id: 7, tipo: 'NOTA CREDITO B', valor: 8 },
    { id: 8, tipo: 'RECIBO B', valor: 9 },
    { id: 9, tipo: 'FACTURA C', valor: 11 },
    { id: 10, tipo: 'NOTA DEBITO C', valor: 12 },
    { id: 11, tipo: 'NOTA CREDITO C', valor: 13 },
    { id: 12, tipo: 'RECIBO C', valor: 15 },
    { id: 13, tipo: 'FACTURA E', valor: 19 },
    { id: 14, tipo: 'NOTA DEBITO E', valor: 20 },
    { id: 15, tipo: 'NOTA CREDITO E', valor: 21 },
    { id: 16, tipo: 'OTROS A', valor: 39 },
    { id: 17, tipo: 'OTROS B', valor: 40 },
    { id: 18, tipo: 'FACTURA M', valor: 51 },
    { id: 19, tipo: 'NOTA DEBITO M', valor: 52 },
    { id: 20, tipo: 'NOTA CREDITO M', valor: 53 }
  ];
  valoresFiltradosComprobantes: any[] = [];

  constructor(
    private formBuilder : FormBuilder,
    private _peticionesHttp : PeticionesHttpService,
    private _adapter: DateAdapter<any>
  ) {
    this.formularioCargarnotaCredito = this.formBuilder.group({
      cliente: ['', Validators.required],
      fecha: ['', Validators.required],
      cae: ['', Validators.required],
      observaciones: ['', Validators.required],
      puntoVenta: ['', Validators.required],
      items: this.formBuilder.array([]),
      comprobantesAsociados: this.formBuilder.array([])
    });
  }

  ngOnInit() : void {
    this.obtenerListaClientes();
    this.verificarAgregarItems();
    this.verificarAgregarComprobantes();

    this._adapter.setLocale('es-AR');

    this.formularioCargarnotaCredito.valueChanges.subscribe(() => {
      this.recalcularResultadoNotaCredito();
    })
  }
  
  get items() {
    return this.formularioCargarnotaCredito.get('items') as FormArray;
  }

  get comprobantesAsociados() {
    return this.formularioCargarnotaCredito.get('comprobantesAsociados') as FormArray;
  }

  verificarAgregarItems() {
    let agregarItem : boolean = true;
    
    this.items.controls.forEach(item => {
      if(item.get('descripcion')?.value == '') {
        agregarItem = false;
        return;
      }
    })

    if(agregarItem) {
      this.agregarItem();
    }
  }

  verificarAgregarComprobantes() {
    let agregarComprobante : boolean = true;

    this.comprobantesAsociados.controls.forEach(comprobante => {
      if(comprobante.get('tipoComprobante')?.value == '') {
        agregarComprobante = false;
        return;
      }
    })

    if(agregarComprobante) {
      this.agregarComprobante();
    }
  }

  agregarComprobante() {
    this.comprobantesAsociados.push(this.formBuilder.group({
      tipoComprobante: [''],
      puntoVenta: [''],
      numeroComprobante: [''],
    }));
  }

  agregarItem() {
    this.items.push(this.formBuilder.group({
      descripcion: [''],
      importe: [''],
      iva: ['']
    }));
  }

  eliminarFilaComprobante(index : number) {
    this.comprobantesAsociados.removeAt(index);

    if(this.comprobantesAsociados.length == 0) {
      this.agregarComprobante();
    }

    this.verificarAgregarComprobantes();
  }

  eliminarFilaItem(index : number) { 
    this.items.removeAt(index);

    if(this.items.length == 0) {
      this.agregarItem();
    }

    this.verificarAgregarItems();
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

   recalcularResultadoNotaCredito() {
    let subtotalNotaCredito = 0.0;
    
    this.items.controls.forEach(item => {
      subtotalNotaCredito += parseFloat(item.get('importe')?.value || 0) * ( 1 + parseFloat(item.get('iva')?.value || 0) / 100);
    });

    this.datosSubtotalNotaCredito.subtotal = subtotalNotaCredito;
   }
  
   filter(filtro : string, index? : number , event? : Event ): void {
    if(filtro == 'cliente') {
      const valorFiltradoCliente = this.inputCliente.nativeElement.value.toLowerCase();
      this.valoresFiltradosClientes = this.listaClientes.filter(
        datosCliente => datosCliente.clientName.toLowerCase().includes(valorFiltradoCliente)
      );
    } else if(filtro == 'comprobante') {
      const valorFiltradoComprobante = (event?.target as HTMLInputElement).value.toLowerCase();
      this.valoresFiltradosComprobantes = this.comprobantes.filter(
        comprobante => comprobante.tipo.toLowerCase().includes(valorFiltradoComprobante)
      );
    }
  }

  obtenerUltimoCae() {
    const datosCliente = this.listaClientes.find(cliente => cliente.clientName == this.formularioCargarnotaCredito.get('cliente')?.value);
    const puntoVenta = this.formularioCargarnotaCredito.get('puntoVenta')?.value;

    if(!datosCliente || !puntoVenta) {
      return;
    }

    let datosEnvio = {
      comprobante: '',
      puntoVenta: puntoVenta
    }
    
    if(datosCliente.ivaType == 'RESPONSABLE INSCRIPTO') {
      datosEnvio.comprobante = 'NOTA DE CRÉDITO A';
    } else if(datosCliente.ivaType == 'MONOTRIBUTO' || datosCliente.ivaType == 'CONSUMIDOR FINAL') {
      datosEnvio.comprobante = 'NOTA DE CRÉDITO B';
    }

    this._peticionesHttp.obtenerUltimoCAE(datosEnvio).subscribe({
      next: (data) => {
        if(data.error) {
          this._peticionesHttp.setRespuestaServer(data.message);
          return;
        }

        this.formularioCargarnotaCredito.patchValue({
          cae: parseInt(data.data.ultimoIdCAE) + 1
        });
      },
      error: (error) => {
        this._peticionesHttp.setRespuestaServer(error.message);
      }
    })
  }

   cargarNotaCredito() {
    if(!this.formularioCargarnotaCredito.valid) {
      return;
    }

    let comprobantesAsociadosNotaCredito : any[] = [];
    let itemsNotaCredito : any[] = [];

    let filaItem : number = 1;
    let filaComprobante : number = 1;

    this.items.controls.forEach(item => {
      if(item.get('descripcion')?.value == '' && item.get('importe')?.value == '' && item.get('iva')?.value == '') {
        return;
      }

      if(item.get('descripcion')?.value == '') {
        this._peticionesHttp.setRespuestaServer('Debe completar la descripción del item de la fila ' + filaItem);
      }

      if(item.get('importe')?.value == '') {
        this._peticionesHttp.setRespuestaServer('Debe completar el importe del item de la fila ' + filaItem);
      }

      if(item.get('iva')?.value == '') {
        this._peticionesHttp.setRespuestaServer('Debe completar el iva del item de la fila ' + filaItem);
      }

      itemsNotaCredito.push({
        descripcion: item.get('descripcion')?.value,
        importe: item.get('importe')?.value,
        iva: item.get('iva')?.value
      });

      filaItem++;
    });

    this.comprobantesAsociados.controls.forEach(comprobante => {
      if(comprobante.get('tipoComprobante')?.value == '' && comprobante.get('puntoVenta')?.value == '' && comprobante.get('numeroComprobante')?.value == '') {
        return;
      }

      if(comprobante.get('tipoComprobante')?.value == '') {
        this._peticionesHttp.setRespuestaServer('Debe completar el tipo de comprobante de la fila ' + filaComprobante);
      }

      if(comprobante.get('puntoVenta')?.value == '') {
        this._peticionesHttp.setRespuestaServer('Debe completar el punto de venta de la fila ' + filaComprobante);
      } 

      if(comprobante.get('numeroComprobante')?.value == '') {
        this._peticionesHttp.setRespuestaServer('Debe completar el número de comprobante de la fila ' + filaComprobante);
      } 

      comprobantesAsociadosNotaCredito.push({
        tipoComprobante: comprobante.get('tipoComprobante')?.value,
        puntoVenta: comprobante.get('puntoVenta')?.value,
        numeroComprobante: comprobante.get('numeroComprobante')?.value
      });

      filaComprobante++;
    });

    let data = {
      cae: this.formularioCargarnotaCredito.value.cae,
      descuento: this.formularioCargarnotaCredito.value.descuento,
      cliente: this.formularioCargarnotaCredito.value.cliente,
      fecha: this.formularioCargarnotaCredito.value.fecha,
      puntoVenta: this.formularioCargarnotaCredito.value.puntoVenta,
      idCliente: this.obtenerIdClienteSegunNombre(),
      observaciones: this.formularioCargarnotaCredito.value.observaciones,
      comprobantesAsociados: comprobantesAsociadosNotaCredito,
      itemsNotaCredito: itemsNotaCredito,
      resultadoFactura: this.datosSubtotalNotaCredito
    };
    
    this._peticionesHttp.cargarNotaCredito(data).subscribe({
      next: (data) => {
        if(!data.error) {
          this.formularioCargarnotaCredito.reset();
        }

        this._peticionesHttp.setRespuestaServer(data.message);
      },
      error: (error) => {
        this._peticionesHttp.setRespuestaServer(error.message);
      }
    });
   }

   obtenerIdClienteSegunNombre() : number {
     let idCliente : number = 0;
 
     const datosCliente = this.listaClientes.find(cliente => cliente.clientName.toLowerCase() === this.formularioCargarnotaCredito.value.cliente.toLowerCase());
 
     if(datosCliente) {
       idCliente = datosCliente.id;
     }
 
     return idCliente;
   }
}
