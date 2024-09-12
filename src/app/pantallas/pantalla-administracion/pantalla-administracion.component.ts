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
          icono: 'manage_search'
        }
      ]
    },
    {
      titulo: 'Lista de precios',
      url: '',
      icono: 'attach_money',
      subopciones: [
        {
          titulo: 'Cargar lista de precios',
          url: 'cargar-lista-precios',
          icono: 'add'
        },
        {
          titulo: 'Consultar lista de precios',
          url: 'consultar-lista-precios',
          icono: 'manage_search'
        }
      ]
    },
    {
      titulo: 'Facturación',
      url: '',
      icono: 'print_add',
      subopciones: [
        {
          titulo: 'Cargar factura',
          url: 'cargar-factura',
          icono: 'description'
        },
        {
          titulo: 'Consultar factura',
          url: 'consultar-factura',
          icono: 'manage_search'
        },
        {
          titulo: 'Cargar nota de crédito',
          url: 'cargar-nota-credito',
          icono: 'description'
        },
        {
          titulo: 'Consultar nota de crédito',
          url: 'consultar-nota-credito',
          icono: 'manage_search'
        },
        {
          titulo: 'Cargar nota de débito',
          url: 'cargar-nota-debito',
          icono: 'description'
        },
        {
          titulo: 'Consultar nota de débito',
          url: 'consultar-nota-debito',
          icono: 'manage_search'
        }
      ]
    },
    {
      titulo: 'Pagos',
      url: 'consultar-pagos',
      icono: 'credit_card',
      subopciones: [ 
        {
          titulo: 'Cargar pago',
          url: 'cargar-pago',
          icono: 'add'
        },
        {
          titulo: 'Consultar pago',
          url: 'consultar-pagos',
          icono: 'manage_search'
        }
      ]
    }
  ];
}
