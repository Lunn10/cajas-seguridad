import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IOpcionesMenu } from '../../models/opciones-menu-model';
import { NgFor, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-menu-sistema',
  standalone: true,
  imports: [
    RouterLink,
    NgFor,
    MatIconModule,
    NgIf
  ],
  templateUrl: './menu-sistema.component.html',
  styleUrl: './menu-sistema.component.scss'
})
export class MenuSistemaComponent {
  @Input() opcionesMenu : IOpcionesMenu[] = [];
  selectedOpcionMenu: any = null;
  estaOpcionMenuSeleccionada: boolean = false;


  centrarOpcionMenu(opcionMenu: any) {
    if (this.selectedOpcionMenu === opcionMenu) {
      this.selectedOpcionMenu = null;
      this.estaOpcionMenuSeleccionada = false;
    } else {
      this.selectedOpcionMenu = opcionMenu;
      this.estaOpcionMenuSeleccionada = true;
    }
  }
}
