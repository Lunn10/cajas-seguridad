import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeticionesHttpService } from '../../../services/peticiones-http.service';
import { ActivatedRoute } from '@angular/router';
import { Form, FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-generar-pdf-factura',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './generar-pdf-factura.component.html',
  styleUrl: './generar-pdf-factura.component.scss'
})
export class GenerarPdfFacturaComponent implements OnInit {
  idFactura : number = 0;
  datosFactura : any = {};
  datosCliente : any = {};
  
  constructor(
    private _peticionesHttp : PeticionesHttpService,
    private router : ActivatedRoute,
    private formBuilder : FormBuilder
  ) { 

  }

  ngOnInit(): void {
    this.router.params.subscribe(params => {

      if(params['id']) {
        this.idFactura = params['id'];
        this.obtenerDatosFactura();
      }
    });
  }

  obtenerDatosFactura() {
    let datos : FormGroup = this.formBuilder.group({
      id: this.idFactura
    })

    this._peticionesHttp.consultarFacturas(datos).subscribe({
      next: (data) => {
        this.datosFactura = data.data[0];

        if(this.datosFactura.idCliente) {
          this.obtenerDatosCliente();
        }

        this.datosFactura.numeroComprobante = this.datosFactura.puntoVenta.toString().padStart(4, '0') + '-' + this.datosFactura.numeroFactura.toString().padStart(8, '0');
      },
      error: (error) => {
        this._peticionesHttp.setRespuestaServer(error.message);
      }
    });
  }

  obtenerDatosCliente() {
    this._peticionesHttp.obtenerCliente(this.datosFactura.idCliente).subscribe({
      next: (data) => {
        this.datosCliente = data.data;
      },
      error: (error) => {
        this._peticionesHttp.setRespuestaServer(error.message);
      }
    });
  }
}
