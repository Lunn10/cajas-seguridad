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
      icono: 'key_vertical'
    }, {
      titulo: 'Pedidos',
      url: 'consultar-pedidos',
      icono: 'shopping_cart'
    }
  ]
}
