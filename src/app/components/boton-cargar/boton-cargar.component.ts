import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-boton-cargar',
  standalone: true,
  imports: [
    MatIconModule,
    RouterLink
  ],
  templateUrl: './boton-cargar.component.html',
  styleUrl: './boton-cargar.component.scss'
})
export class BotonCargarComponent {
  @Input() direccion : string = '';
}
