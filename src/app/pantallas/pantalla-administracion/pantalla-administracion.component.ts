import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
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
      icono: 'storefront'
    },
    {
      titulo: 'Facturación',
      url: 'cargar-factura',
      icono: 'print_of_sale'
    }
  ];
}
