import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IOpcionesMenu } from '../../models/opciones-menu-model';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-menu-sistema',
  standalone: true,
  imports: [
    RouterLink,
    MatIconModule,
    CommonModule
  ],
  templateUrl: './menu-sistema.component.html',
  styleUrl: './menu-sistema.component.scss'
})
export class MenuSistemaComponent {
  @Input() opcionesMenu : IOpcionesMenu[] = [];
  selectedOpcionMenu: any = null;
  estaOpcionMenuSeleccionada: boolean = false;
  estaEnAnimacion: boolean[] = [];
  reproduciendoAnimacion : boolean = false;

  constructor(
    private router : Router,
    private route : ActivatedRoute
  ) {}

  accionClickMenu(event: Event, opcionMenu: any) {
    if (!(event.target as HTMLElement).closest('a')) {
      this.centrarOpcionMenu(opcionMenu);
    }
  }

  centrarOpcionMenu(opcionMenu: any) {
    if (this.selectedOpcionMenu === opcionMenu) {
      this.selectedOpcionMenu = null;
      this.estaOpcionMenuSeleccionada = false; 
    } else {
      this.selectedOpcionMenu = opcionMenu;
      this.estaOpcionMenuSeleccionada = true;
    } 
  }

  playAnimation(index: number, url: string, event: Event) {
    event.stopPropagation();
    this.estaEnAnimacion[index] = true;
    this.reproduciendoAnimacion = true;

    setTimeout(() => {
      this.estaEnAnimacion[index] = false;
      this.router.navigate([url], { relativeTo: this.route });
      this.centrarOpcionMenu(null);
    }, 1000);
  }
}
