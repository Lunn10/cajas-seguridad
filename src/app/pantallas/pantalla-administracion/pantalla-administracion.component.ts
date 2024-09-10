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
          url: 'agregar-cliente',
          icono: 'add'
        },
        {
          titulo: 'Consultar cliente',
          url: 'consultar-cliente',
          icono: 'edit'
        }
      ]
    },
    {
      titulo: 'Lista de precios',
      url: 'consultar-lista-precios',
      icono: 'attach_money'
    },
    {
      titulo: 'Facturas',
      url: 'consultar-factura',
      icono: 'print_of_sale'
    },
    {
      titulo: 'Nota de crédito',
      url: 'consultar-nota-credito',
      icono: 'description'
    },
    {
      titulo: 'Pagos',
      url: 'consultar-pagos',
      icono: 'credit_card'
    },
    {
      titulo: 'Volver al inicio',
      url: '',
      icono: 'home'
    }
  ];
}
