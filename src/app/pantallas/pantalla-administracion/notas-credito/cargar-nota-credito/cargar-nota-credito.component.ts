import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EncabezadoComponent } from '../../../../components/encabezado/encabezado.component';
import { RespuestaServerComponent } from '../../../../components/respuesta-server/respuesta-server.component';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PeticionesHttpService } from '../../../../services/peticiones-http.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';

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
    MatSelectModule
  ],
  templateUrl: './cargar-nota-credito.component.html',
  styleUrl: './cargar-nota-credito.component.scss'
})
export class CargarNotaCreditoComponent implements OnInit {
  formularioCargarnotaCredito : FormGroup;
  listaClientes : any[] = [];
  valoresFiltradosClientes : any[] = [];
  @ViewChild('inputCliente') inputCliente!: ElementRef<HTMLInputElement>;
  porcentajeIvaCliente : number = 0;

  constructor(
    private formBuilder : FormBuilder,
    private _peticionesHttp : PeticionesHttpService
  ) {
    this.formularioCargarnotaCredito = this.formBuilder.group({
      cliente: [''],
      fecha: [''],
      cae: [''],
      monto: [''],
      observaciones: [''],
      items: this.formBuilder.array([])
    });
  }

  ngOnInit() : void {
    this.obtenerListaClientes();
    this.verificarAgregarItems();
  }
  
  get items() {
    return this.formularioCargarnotaCredito.get('items') as FormArray;
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

  agregarItem() {
    this.items.push(this.formBuilder.group({
      descripcion: [''],
      importe: [''],
      iva: ['']
    }));
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
  
   filter(filtro : string ): void {
    if(filtro == 'cliente') {
      const valorFiltradoCliente = this.inputCliente.nativeElement.value.toLowerCase();
      this.valoresFiltradosClientes = this.listaClientes.filter(
        datosCliente => datosCliente.clientName.toLowerCase().includes(valorFiltradoCliente)
      );
    } 
  }

  obtenerUltimoCae() {
    let datosCliente = this.listaClientes.find(cliente => cliente.clientName == this.formularioCargarnotaCredito.get('cliente')?.value);

    if(!datosCliente) {
      return;
    }

    let datosEnvio = {
      comprobante: ''
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
   }
}
