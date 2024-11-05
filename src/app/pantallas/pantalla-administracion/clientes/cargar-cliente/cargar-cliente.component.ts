import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EncabezadoComponent } from '../../../../components/encabezado/encabezado.component';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatAutocompleteModule } from '@angular/material/autocomplete'; 
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { PeticionesHttpService } from '../../../../services/peticiones-http.service';
import { ActivatedRoute } from '@angular/router';
import { RespuestaServerComponent } from '../../../../components/respuesta-server/respuesta-server.component';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-cargar-cliente',
  standalone: true,
  imports: [
    EncabezadoComponent,
    RespuestaServerComponent,
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule, 
    MatButtonModule, 
    MatCardModule,
    MatStepperModule,
    MatAutocompleteModule,
    MatTableModule,
    MatIconModule
  ],
  templateUrl: './cargar-cliente.component.html',
  styleUrl: './cargar-cliente.component.scss'
})
export class CargarClienteComponent implements OnInit {
  formularioCargarCliente: FormGroup;
  mensajeServer : String = '';
  idCliente : Number = 0;
  opcionesSelectProvincias : any[] = [];
  valoresFiltradosProvincias : any[] = [];
  opcionesSelectTipoIVA : any[] = [];
  valoresFiltradosTipoIVA : any[] = [];
  @ViewChild('inputProvincia') inputProvincia!: ElementRef<HTMLInputElement>;
  @ViewChild('inputIva') inputIva!: ElementRef<HTMLInputElement>;

  constructor (
    private form : FormBuilder,
    private _peticionesHttp : PeticionesHttpService,
    private _route : ActivatedRoute
  ) {
    this.obtenerTiposIVA();
    this.obtenerProvincias();

    this.formularioCargarCliente = this.form.group({
      idCliente: [this.idCliente],
      nombreCliente: ['', Validators.required],
      nombreFantasia: ['', Validators.required],
      direccion: ['', Validators.required],
      numeroDireccion: ['', Validators.required],
      localidad: ['', Validators.required],
      provincia: ['', Validators.required],
      codigoPostal: ['', Validators.required],
      cuit: ['', Validators.required],
      iva: ['', Validators.required],
      transporte: [''],
      observacionesTransporte: [''],
      contactos: this.form.array([])
    })
  }

  ngOnInit(): void {
    this.formularioCargarCliente.reset();
    this.formularioCargarCliente?.patchValue({idCliente: this.idCliente});

    this._route.params.subscribe( params => {
      if(params['id']) {
        this.obtenerCliente(params['id']);
      }
    })

    this.agregarContacto();
  }

  get contactos(): FormArray {
    return this.formularioCargarCliente.get('contactos') as FormArray;
  }

  agregarContacto(): void {
    this.contactos.push(this.crearFormGroupContacto());
  }

  eliminarContacto(index: number): void {
    this.contactos.removeAt(index);

    if(this.contactos.length == 0) {
      this.agregarContacto();
    }

    this.verificarAgregarFilas();
  }

  private crearFormGroupContacto(nombre : string = '', telefono : string = '', celular : string = '', email : string = '', contactoFactura : boolean = false): FormGroup {
    return this.form.group({
      nombre: [nombre],
      telefono: [telefono],
      celular: [celular],
      email: [email, Validators.email],
      contactoFactura: [contactoFactura]
    });
  }

  filter(filtro : string ): void {
    if(filtro == 'provincias') {
      const valorFiltradoProvincias = this.inputProvincia.nativeElement.value.toLowerCase();
      this.valoresFiltradosProvincias = this.opcionesSelectProvincias.filter(
        datosProvincia => datosProvincia.stateName.toLowerCase().includes(valorFiltradoProvincias)
      );
    } else if(filtro == 'iva') {
      const valorFiltradoIVA = this.inputIva.nativeElement.value.toLowerCase();
      this.valoresFiltradosTipoIVA = this.opcionesSelectTipoIVA.filter(
        datosTipoIVA => datosTipoIVA.typeName.toLowerCase().includes(valorFiltradoIVA)
      );
    }
  }

  verificarAgregarFilas() {
    let agregarContacto : boolean = true;
    
    this.contactos.controls.forEach(contacto => {
      if(contacto.get('nombre')?.value == '') {
        console.log(contacto.get('nombre')?.value);
        agregarContacto = false;
        return;
      }
    })

    if(agregarContacto) {
      this.agregarContacto();
    }
  }

  cargarCliente() {
    if(!this.formularioCargarCliente.valid) {
      return;
    }

    this._peticionesHttp.crearCliente(this.formularioCargarCliente).subscribe({
      next: (data) => {
        this._peticionesHttp.setRespuestaServer(data.message);
        
        if(!data.error) {
          this.formularioCargarCliente?.reset();
          this.formularioCargarCliente?.patchValue({idCliente : this.idCliente});
        }
      },
      error: (error) => {
        this._peticionesHttp.setRespuestaServer(error.message);
      }
    })
  }

  obtenerTiposIVA() : void {
    this._peticionesHttp.obtenerTiposIVA().subscribe({
      next : (data) => {   
        if(data.error) {
          this._peticionesHttp.setRespuestaServer(data.message);
        } else {
          this.opcionesSelectTipoIVA = data.data;
          this.valoresFiltradosTipoIVA = this.opcionesSelectTipoIVA.slice();
        }
      },
      error : (data) => {
        this._peticionesHttp.setRespuestaServer(data.message);
      }
    });
  }

  obtenerProvincias () : void {
    this._peticionesHttp.obtenerProvincias().subscribe({
      next : (data) => {
        if(data.error) {
   //       this._peticionesHttp.setRespuestaServer(data.message);
        } else {
          this.opcionesSelectProvincias = data.data;
        }
      },
      error : (data) => {
 //       this._peticionesHttp.setRespuestaServer(data.message);
      }
    });
  }

  obtenerCliente(id : Number) : void {
    this._peticionesHttp.obtenerCliente(id).subscribe({
      next : (data) => {
        if(data.error) {
          this._peticionesHttp.setRespuestaServer(data.message);
        } else {
          let datosCliente = data.data;

          this.formularioCargarCliente.patchValue({
            idCliente: datosCliente?.id,
            nombreCliente: datosCliente.clientName,
            nombreFantasia: datosCliente.fantasyName,
            direccion: datosCliente.streetName,
            numeroDireccion: datosCliente.streetNumber,
            localidad: datosCliente.location,
            provincia: datosCliente.stateName,
            codigoPostal: datosCliente.cpNumber,
            cuit: datosCliente.cuitNumber,
            iva: datosCliente.ivaType,
            transporte: datosCliente.transportData.name,
            observacionesTransporte: datosCliente.transportData.observations
          })

          this.contactos.clear();

          datosCliente.contactData.forEach((contacto: { nombre: string; telefono: string; celular: string; email: string; contactoFactura : boolean }) => {
            this.contactos.push(this.crearFormGroupContacto(contacto.nombre, contacto.telefono, contacto.celular, contacto.email, contacto.contactoFactura));
          })

          this.verificarAgregarFilas();
        }
      },
      error : (data) => {
        this._peticionesHttp.setRespuestaServer(data.message);
      }
    });
  }
}
