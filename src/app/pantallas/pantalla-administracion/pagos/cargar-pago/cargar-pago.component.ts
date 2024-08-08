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
          this.opcionesSelectBancos = data.data;
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
        datosBanco => datosBanco.nombre.toLowerCase().includes(valorFiltradoBanco)
      );
    } else if(filtro == 'retencion') {
      const valorFiltradoRetencion = (event?.target as HTMLInputElement).value.toLowerCase();
      this.valoresFiltradosRetenciones = this.opcionesSelectRetenciones.filter(
        datosRetencion => datosRetencion.nombre.toLowerCase().includes(valorFiltradoRetencion)
      );
    }
  }

  consultarEstadoCuentaCliente() : void {
    this._peticionesHttp.obtenerFacturasImpagas(this.formularioConsultarFacturasImpagas).subscribe({
      next: (data) => {
        if(data.error) {
          this._peticionesHttp.setRespuestaServer(data.message);
          return;
        }

        this.facturasImpagas = data.data;

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
  }
}
