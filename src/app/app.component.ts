import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PantallaLogueoComponent } from './pantallas/pantalla-logueo/pantalla-logueo.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PantallaLogueoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'cajas-seguridad';
}
