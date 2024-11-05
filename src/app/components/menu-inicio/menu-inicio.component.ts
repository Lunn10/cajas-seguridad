import { Component, Input } from '@angular/core';
import { IOpcionesMenu } from '../../models/opciones-menu-model';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu-inicio',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './menu-inicio.component.html',
  styleUrl: './menu-inicio.component.scss'
})
export class TarjetaMenuInicioComponent {
  @Input() opcionesMenu : IOpcionesMenu[] = [];
}
