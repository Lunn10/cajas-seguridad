import { Component } from '@angular/core';
import { MenuSistemaComponent } from '../../components/menu-sistema/menu-sistema.component'; 
import { RouterLink, RouterOutlet } from '@angular/router';
import { IOpcionesMenu } from '../../models/opciones-menu-model';

@Component({
  selector: 'app-pantalla-sistema',
  standalone: true,
  imports: [MenuSistemaComponent, RouterLink, RouterOutlet],
  templateUrl: './pantalla-sistema.component.html',
  styleUrl: './pantalla-sistema.component.scss'
})
export class PantallaSistemaComponent {
  opcionesMenu : IOpcionesMenu[] = [
    {
      titulo: 'Lista usuarios',
      url: 'lista-usuarios',
      icono: 'person'
    },
    {
      titulo: 'Crear usuario',
      url: 'crear-usuario',
      icono: 'person_add'
    },
    {
      titulo: 'Lista tipos de usuario',
      url: 'lista-tipos-usuario',
      icono: 'group'
    },
    {
      titulo: 'Crear tipo de usuario',
      url: 'crear-tipo-usuario',
      icono: 'group_add'
    }    
  ]
}
