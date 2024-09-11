import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuSistemaComponent } from '../../components/menu-sistema/menu-sistema.component';
import { IOpcionesMenu } from '../../models/opciones-menu-model';

@Component({
  selector: 'app-pantalla-administracion',
  standalone: true,
  imports: [
    RouterOutlet,
    MenuSistemaComponent
  ],
  templateUrl: './pantalla-administracion.component.html',
  styleUrl: './pantalla-administracion.component.scss'
})
export class PantallaAdministracionComponent {
  opcionesMenu : IOpcionesMenu[] = [
    {
      titulo: 'Clientes',
      url: 'consultar-cliente',
      icono: 'storefront',
      subopciones: [
        {
          titulo: 'Agregar cliente',
          url: 'cargar-cliente',
          icono: 'add'
        },
        {
          titulo: 'Consultar cliente',
          url: 'consultar-cliente',
          icono: 'search'
        },
        {
          titulo: 'Consultar cliente',
          url: 'consultar-cliente',
          icono: 'person'
        },
        {
          titulo: 'Consultar cliente',
          url: 'consultar-cliente',
          icono: 'road'
        }
      ]
    },
    {
      titulo: 'Lista de precios',
      url: 'consultar-lista-precios',
      icono: 'attach_money',
      subopciones: []
    },
    {
      titulo: 'Facturas',
      url: 'consultar-factura',
      icono: 'print_of_sale',
      subopciones: [
        {
          titulo: 'Agregar cliente',
          url: 'cargar-cliente',
          icono: 'add'
        },
        {
          titulo: 'Consultar cliente',
          url: 'consultar-cliente',
          icono: 'search'
        },
        {
          titulo: 'Consultar cliente',
          url: 'consultar-cliente',
          icono: 'person'
        },
        {
          titulo: 'Consultar cliente',
          url: 'consultar-cliente',
          icono: 'road'
        }
      ]
    },
    {
      titulo: 'Nota de crédito',
      url: 'consultar-nota-credito',
      icono: 'description',
      subopciones: []
    },
    {
      titulo: 'Pagos',
      url: 'consultar-pagos',
      icono: 'credit_card',
      subopciones: []
    }
  ];
}
