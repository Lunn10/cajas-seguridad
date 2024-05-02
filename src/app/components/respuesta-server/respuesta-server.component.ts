import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-respuesta-server',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './respuesta-server.component.html',
  styleUrl: './respuesta-server.component.scss'
})
export class RespuestaServerComponent {
  mostrar : boolean = false;
  @Input() mensaje : String = '';

  public mostrarRespuestaServer() : void {
    this.mostrar = true;
  }
}
