import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IOpcionesMenu } from '../../models/opciones-menu-model';
import { MenuSistemaComponent } from '../../components/menu-sistema/menu-sistema.component';

@Component({
  selector: 'app-pantalla-produccion',
  standalone: true,
  imports: [
    RouterOutlet,
    MenuSistemaComponent,
    
  ],
  templateUrl: './pantalla-produccion.component.html',
  styleUrl: './pantalla-produccion.component.scss'
})
export class PantallaProduccionComponent {
  opcionesMenu : IOpcionesMenu[] = [
    {
      titulo: 'Procesos',
      url: '',
      icono: 'account_tree',
      subopciones: [
        {
          titulo: 'Cargar proceso',
          url: 'cargar-proceso',
          icono: 'data_saver_on',
        },
        {
          titulo: 'Consultar proceso',
          url: 'consultar-proceso',
          icono: 'manage_search',
        }
      ]
    }
  ]
}
