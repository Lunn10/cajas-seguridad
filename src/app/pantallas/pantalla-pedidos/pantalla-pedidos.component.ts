import { Component } from '@angular/core';
import { IOpcionesMenu } from '../../models/opciones-menu-model';
import { RouterModule } from '@angular/router';
import { MenuSistemaComponent } from '../../components/menu-sistema/menu-sistema.component';

@Component({
  selector: 'app-pantalla-pedidos',
  standalone: true,
  imports: [
    MenuSistemaComponent,
    RouterModule
  ],
  templateUrl: './pantalla-pedidos.component.html',
  styleUrl: './pantalla-pedidos.component.scss'
})
export class PantallaPedidosComponent {
  opcionesMenu : IOpcionesMenu[] = [
    {
      titulo: 'Artículos',
      url: 'lista-articulos',
      icono: 'key_vertical',
      subopciones: [
        {
          titulo: 'Cargar artículo',
          url: 'cargar-articulo',
          icono: 'enhanced_encryption',
        },
        {
          titulo: 'Lista artículos',
          url: 'lista-articulos',
          icono: 'manage_search',
        }
      ]
    }, {
      titulo: 'Pedidos',
      url: 'consultar-pedidos',
      icono: 'shopping_cart',
      subopciones: [
        {
          titulo: 'Cargar pedido',
          url: 'cargar-pedido',
          icono: 'add_shopping_cart',
        },
        {
          titulo: 'Consultar pedidos',
          url: 'consultar-pedidos',
          icono: 'manage_search',
        }
      ]
    }
  ]
}
