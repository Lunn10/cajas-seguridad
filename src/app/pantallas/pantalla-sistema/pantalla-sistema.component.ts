import { Component } from '@angular/core';
import { MenuSistemaComponent } from '../../components/menu-sistema/menu-sistema.component'; 
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-pantalla-sistema',
  standalone: true,
  imports: [MenuSistemaComponent, RouterLink, RouterOutlet],
  templateUrl: './pantalla-sistema.component.html',
  styleUrl: './pantalla-sistema.component.scss'
})
export class PantallaSistemaComponent {

}
