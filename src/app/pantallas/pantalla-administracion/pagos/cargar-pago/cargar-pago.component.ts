import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { RespuestaServerComponent } from '../../../../components/respuesta-server/respuesta-server.component';
import { EncabezadoComponent } from '../../../../components/encabezado/encabezado.component';
import { PeticionesHttpService } from '../../../../services/peticiones-http.service';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DateAdapter, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-cargar-pago',
  standalone: true,
  imports: [
    RespuestaServerComponent,
    EncabezadoComponent,
    ReactiveFormsModule,
    CommonModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatIconModule,
    MatButtonModule,
    MatDatepickerModule,
    MatCardModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './cargar-pago.component.html',
  styleUrl: './cargar-pago.component.scss'
})
export class CargarPagoComponent implements OnInit {
  formularioConsultarFacturasImpagas : FormGroup;
  formularioCargarPago : FormGroup;
  opcionesSelectClientes : any[] = [];
  valoresFiltradosClientes : any[] = [];
  opcionesSelectBancos : any[] = [];
  valoresFiltradosBancos : any[] = [];
  opcionesSelectRetenciones : any[] = [];
  valoresFiltradosRetenciones : any[] = [];
  @ViewChild('inputCliente') inputCliente!: ElementRef<HTMLInputElement>;
  @ViewChildren('dateInput') dateInputs!: QueryList<ElementRef<HTMLInputElement>>;
  @ViewChildren('fechaRetencion') fechaRetenciones!: QueryList<ElementRef<HTMLInputElement>>;
  
  datosSubtotal : any = {
    totalRetenciones: 0.0,
    totalAPagar: 0.0,
    totalPagos: 0.0,
    totalComprobantes: 0.0
  }

  facturasImpagas : any[] = [];

  constructor(
    private _peticionesHttp : PeticionesHttpService,
    private formBuilder : FormBuilder,
    private _adapter: DateAdapter<any>,
  ) { 
    this.formularioConsultarFacturasImpagas = this.formBuilder.group({
      cliente: ['']
    })

    this.formularioCargarPago = this.formBuilder.group({
      idPago: [0],
      cliente: [''],
      comprobantes: this.formBuilder.array([]),
      retenciones: this.formBuilder.array([]),
      pagos: this.formBuilder.array([])
    })
  
    this._adapter.setLocale('es-AR');
  }

  ngOnInit() {
    this.obtenerListaClientes();
    this.obtenerListaBancos();
    this.obtenerListaRetenciones();

    this.verificarAgregarFilasPagos();
    this.verificarAgregarFilasRetenciones();
  }

  ngAfterViewChecked() {
    if (this.dateInputs) {
      this.dateInputs.forEach((input) => {
        input.nativeElement.placeholder = 'Vencimiento';
      });
    }

    if (this.fechaRetenciones) {
      this.fechaRetenciones.forEach((input) => {
        input.nativeElement.placeholder = 'Fecha';
      });
    }
  }

  get pagos(): FormArray {
    return this.formularioCargarPago.get('pagos') as FormArray;
  }

  get retenciones(): FormArray {
    return this.formularioCargarPago.get('retenciones') as FormArray;
  }

  get comprobantes(): FormArray {
    return this.formularioCargarPago.get('comprobantes') as FormArray;
  }

  agregarPago(): void {
    this.pagos.push(this.crearFormGroupPago());
  }

  agregarRetencion(): void {
    this.retenciones.push(this.crearFormGroupRetencion());
  }

  eliminarPago(index: number): void {
    this.pagos.removeAt(index);

    if(this.pagos.length == 0) {
      this.agregarPago();
    }

    this.verificarAgregarFilasPagos();
  }

  eliminarRetencion(index: number): void {
    this.retenciones.removeAt(index);

    if(this.retenciones.length == 0) {
      this.agregarRetencion();
    }

    this.verificarAgregarFilasRetenciones();
  }

  verificarAgregarFilasPagos() {
    let agregarPago : boolean = true;
    
    this.pagos.controls.forEach(pago => {
      if(pago.get('numeroCheque')?.value == '') {
        agregarPago = false;
        return;
      }
    })

    if(agregarPago) {
      this.agregarPago();
    }
  }

  verificarAgregarFilasRetenciones() {
    let agregarRetencion : boolean = true;
    
    this.retenciones.controls.forEach(retencion => {
      if(retencion.get('nombre')?.value == '') {
        agregarRetencion = false;
        return;
      }
    })

    if(agregarRetencion) {
      this.agregarRetencion();
    }
  }

  private crearFormGroupPago(): FormGroup {
    return this.formBuilder.group({
      numeroCheque: [''],
      banco: [''],
      importe: [''],
      fechaVencimiento: ['']
    });
  }

  private crearFormGroupRetencion(): FormGroup {
    return this.formBuilder.group({
      nombre: [''],
      numero: [''],
      fecha: [''],
      regimen: [''],
      importe: ['']
    });
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

  obtenerListaBancos() : void {
    this._peticionesHttp.obtenerListaBancos().subscribe({
      next : (data) => {
        if(data.error) {
          this._peticionesHttp.setRespuestaServer(data.message);
        } else {
          data.data.forEach((datosBanco : any) => {
            this.opcionesSelectBancos.push({
              numeroInterno: datosBanco.numero_interno.toString().padStart(3, '0'),
              nombre: datosBanco.nombre
            })
          });

          this.opcionesSelectBancos.sort((a, b) => a.numeroInterno - b.numeroInterno);

          this.valoresFiltradosBancos = this.opcionesSelectBancos.slice();
        }
      },
      error : (data) => {
        this._peticionesHttp.setRespuestaServer(data.message);
      }
    })
  }

  obtenerListaRetenciones() : void {
    this._peticionesHttp.obtenerListaRetenciones().subscribe({
      next : (data) => {
        if(data.error) {
          this._peticionesHttp.setRespuestaServer(data.message);
        } else {
          this.opcionesSelectRetenciones = data.data;
          this.valoresFiltradosRetenciones = this.opcionesSelectRetenciones.slice();
        }
      },
      error : (data) => {
        this._peticionesHttp.setRespuestaServer(data.message);
      }
    })
  }

  filter(filtro : string,index? : number , event? : Event ): void {
    if(filtro == 'cliente') {
      const valorFiltradoCliente = this.inputCliente.nativeElement.value.toLowerCase();
      this.valoresFiltradosClientes = this.opcionesSelectClientes.filter(
        datosCliente => datosCliente.clientName.toLowerCase().includes(valorFiltradoCliente)
      );
    } else if(filtro == 'banco') {
      const valorFiltradoBanco = (event?.target as HTMLInputElement).value.toLowerCase();
      this.valoresFiltradosBancos = this.opcionesSelectBancos.filter(
        datosBanco => (datosBanco.numeroInterno + ' - ' + datosBanco.nombre).toLowerCase().includes(valorFiltradoBanco)
      );
    } else if(filtro == 'retencion') {
      const valorFiltradoRetencion = (event?.target as HTMLInputElement).value.toLowerCase();
      this.valoresFiltradosRetenciones = this.opcionesSelectRetenciones.filter(
        datosRetencion => datosRetencion.nombre.toLowerCase().includes(valorFiltradoRetencion)
      );
    }
  }

  actualizarValorTotalPagos() {
    this.datosSubtotal.totalPagos = 0.0;
    
    this.pagos.controls.forEach(datosPago => {
      if(!datosPago.value.importe) {
        return;
      }

      this.datosSubtotal.totalPagos += parseFloat(datosPago.value.importe);
    })

    this.actualizarValorTotalAPagar();
  }

  actualizarValorTotalRetenciones() {
    this.datosSubtotal.totalRetenciones = 0.0;
    
    this.retenciones.controls.forEach(datosRetencion => {
      if(!datosRetencion.value.importe) {
        return;
      }

      this.datosSubtotal.totalRetenciones += parseFloat(datosRetencion.value.importe);
    })

    this.actualizarValorTotalAPagar();
  }

  actualizarValorTotalAPagar() {
    this.datosSubtotal.totalAPagar = parseFloat(this.datosSubtotal.totalPagos) + parseFloat(this.datosSubtotal.totalRetenciones);
  }

  actualizarValorTotalComprobantes() {
    this.datosSubtotal.totalComprobantes = 0.0;
    
    this.comprobantes.controls.forEach(datosComprobante => {
      this.datosSubtotal.totalComprobantes += parseFloat(datosComprobante.value.montoAPagar);
    })
  }

  consultarEstadoCuentaCliente() : void {
    this._peticionesHttp.obtenerFacturasImpagas(this.formularioConsultarFacturasImpagas).subscribe({
      next: (data) => {
        if(data.error) {
          this._peticionesHttp.setRespuestaServer(data.message);
          return;
        }

        this.facturasImpagas = data.data;
        this.comprobantes.clear();
        this.datosSubtotal.totalComprobantes = 0.0;

        this.facturasImpagas.forEach(datosFactura => {
          this.comprobantes.push(
            this.formBuilder.group({
              fechaComprobante: [datosFactura.fechaFactura],
              tipoComprobante: [datosFactura.tipoFactura],
              numeroComprobante: [datosFactura.id],
              montoComprobante: [datosFactura.montoTotal],
              montoAPagar:[0]
            })
          )
        });

        this.formularioCargarPago.patchValue({
          cliente: this.formularioConsultarFacturasImpagas.get('cliente')?.value
        })
      },
      error: (error) => {
        this._peticionesHttp.setRespuestaServer(error.message);
      }
    })
  }

  cargarPago() {
    if(!this.formularioCargarPago.valid) {
      return;
    }

    let comprobantes : any[] = [];
    let retenciones : any[] = [];
    let pagos : any[] = [];
    let errorFormulario : boolean = false;

    if(this.datosSubtotal.totalComprobantes != this.datosSubtotal.totalAPagar) {
      this._peticionesHttp.setRespuestaServer("El monto a pagar no coincide con el valor de los pagos y retenciones cargadas");
      errorFormulario = true;
    }

    this.comprobantes.controls.forEach(datosPago => {
      let comprobanteActual = {
        numeroComprobante: datosPago.value.numeroComprobante,
        montoComprobante: datosPago.value.montoComprobante,
        montoAPagar: datosPago.value.montoAPagar,
        tipoFactura: datosPago.value.tipoComprobante
      }

      if(comprobanteActual.montoComprobante < comprobanteActual.montoAPagar) {
        this._peticionesHttp.setRespuestaServer("El monto del comprobante " + comprobanteActual.numeroComprobante + " es menor al monto que ingresó para pagar");
        errorFormulario = true;
        return;
      }

      if(comprobanteActual.montoAPagar == 0.0) {
        return;
      }

      comprobantes.push(comprobanteActual);
    });

    this.retenciones.controls.forEach(datosRetencion => {
      let retencionActual = {
        nombre: datosRetencion.value.nombre,
        regimen: datosRetencion.value.regimen,
        numero: datosRetencion.value.numero,
        importe: datosRetencion.value.importe,
        fecha: datosRetencion.value.fecha
      }
      
      if(retencionActual.nombre == '') {
        return;
      }

      if(retencionActual.nombre != '' && (
        retencionActual.regimen == '' || retencionActual.numero == '' || 
        retencionActual.importe == '' || retencionActual.fecha == null
      ) ) {
        this._peticionesHttp.setRespuestaServer("Una de las retenciones no está cargada de manera completa");
        errorFormulario = true;
        return;
      }

      retenciones.push(retencionActual);
    });

    this.pagos.controls.forEach(datosPago => {
      let pagoActual = {
        numeroCheque: datosPago.value.numeroCheque,
        banco: datosPago.value.banco,
        importe: datosPago.value.importe,
        fechaVencimiento: datosPago.value.fechaVencimiento
      }
      
      if(pagoActual.numeroCheque == '') {
        return;
      }

      if(pagoActual.numeroCheque != '' && (
        pagoActual.banco == '' || pagoActual.importe == '' || pagoActual.fechaVencimiento == null
      ) ) {
        this._peticionesHttp.setRespuestaServer("Uno de los pagos no está cargado de manera completa");
        errorFormulario = true;
        return;
      }

      pagos.push(pagoActual);
    });

    if(errorFormulario) {
      return;
    }

    let datosCobranza = {
      comprobantes: comprobantes,
      retenciones: retenciones,
      pagos: pagos,
      cliente: this.formularioCargarPago.get('cliente')?.value,
      idPago: this.formularioCargarPago.get('idPago')?.value,
      totalAPagar: this.datosSubtotal.totalComprobantes
    }

    this._peticionesHttp.cargarPago(datosCobranza).subscribe({
      next: (data) => {

        this._peticionesHttp.setRespuestaServer(data.message);
      },
      error: (error) => {
        this._peticionesHttp.setRespuestaServer(error.message);
      }
    })
  }
}
