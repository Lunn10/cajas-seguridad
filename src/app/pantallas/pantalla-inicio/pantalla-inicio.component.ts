import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IOpcionesMenu } from '../../models/opciones-menu-model';
import { TarjetaMenuInicioComponent } from '../../components/menu-inicio/menu-inicio.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pantalla-inicio',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    TarjetaMenuInicioComponent
  ],
  templateUrl: './pantalla-inicio.component.html',
  styleUrl: './pantalla-inicio.component.scss'
})
export class PantallaInicioComponent {
  opcionesMenu : IOpcionesMenu[] = [
    {
      titulo: 'Administrar cuentas',
      url: 'administrar-sistema',
      icono: 'manage_accounts',
      subopciones: []
    },
    {
      titulo: 'Producción',
      url: 'sistema-produccion',
      icono: 'precision_manufacturing',
      subopciones: []
    },
    {
      titulo: 'Administración',
      url: 'sistema-administracion',
      icono: 'receipt_long',
      subopciones: []
    },
    {
      titulo: 'Pedidos',
      url: 'sistema-pedidos',
      icono: 'local_shipping',
      subopciones: []
    },
    {
      titulo: 'Mensajería',
      url: '',
      icono: 'forum',
      subopciones: []
    }
  ]
}
