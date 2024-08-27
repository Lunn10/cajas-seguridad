import { Component, OnInit } from '@angular/core';
import { RespuestaServerComponent } from '../../../../components/respuesta-server/respuesta-server.component';
import { EncabezadoComponent } from '../../../../components/encabezado/encabezado.component';
import { PeticionesHttpService } from '../../../../services/peticiones-http.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cuenta-corriente',
  standalone: true,
  imports: [
    RespuestaServerComponent,
    EncabezadoComponent,
    CommonModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './cuenta-corriente.component.html',
  styleUrl: './cuenta-corriente.component.scss'
})
export class CuentaCorrienteComponent implements OnInit {
  formularioCuentaCorriente : FormGroup;
  idCliente : number = 0;
  datosCliente : any = {};
  cuentaCorriente : any[] = [];

  constructor(
    private _peticionesHttp : PeticionesHttpService,
    private formBuilder : FormBuilder,
    private _route : ActivatedRoute
  ) {
    this.formularioCuentaCorriente = this.formBuilder.group({
      idCliente: 0
    });
  }

  ngOnInit() {
    this.formularioCuentaCorriente.reset();
    this.formularioCuentaCorriente?.patchValue({idCliente: this.idCliente});

    this._route.params.subscribe( params => {
      if(params['id']) {
        this.formularioCuentaCorriente?.patchValue({idCliente: params['id']});
        this.obtenerCuentaCorrienteCliente();
      }
    })
  }

  getIcon(tipoConcepto: string): string {
    switch (tipoConcepto) {
      case 'PAGO FACTURA':
        return 'payment';
      case 'FACTURA A':
        return 'receipt';
      default:
        return 'help_outline';
    }
  }

  obtenerCuentaCorrienteCliente() {
    this._peticionesHttp.obtenerCuentaCorrienteCliente(this.formularioCuentaCorriente).subscribe({
      next : (data) => {
        if(data.error) {
          this._peticionesHttp.setRespuestaServer(data.message);
        } else {
          this.datosCliente = data.data.datosCliente;
          
          let datosCuentaCorriente : any[] = [];
          let importeActual = 0;

          data.data.cuentaCorriente.forEach((movimientoActual: { 
            fecha: Date; 
            id: number; 
            tipoConcepto: string; 
            debe: number; 
            haber: number; 
            idConcepto: number
          }) => {

            let importe = movimientoActual.debe;

            if(movimientoActual.debe > 0 ) {
              importeActual -= movimientoActual.debe;
            } else {
              importeActual += movimientoActual.haber;
              importe = movimientoActual.haber;
            }

            datosCuentaCorriente.push({
              id: movimientoActual.id,
              fecha: movimientoActual.fecha,
              tipoConcepto: movimientoActual.tipoConcepto,
              debe: movimientoActual.debe,
              haber: movimientoActual.haber,
              importe: importe,
              idConcepto: movimientoActual.idConcepto,
              saldoActual: importeActual
            });
          });

          this.cuentaCorriente = datosCuentaCorriente;
        }
      },
      error : (data) => {
        this._peticionesHttp.setRespuestaServer(data.message);
      }
    })
  }
}
