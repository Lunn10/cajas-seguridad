import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { PantallaLogueoComponent } from './pantallas/pantalla-logueo/pantalla-logueo.component';
import { PantallaInicioComponent } from "./pantallas/pantalla-inicio/pantalla-inicio.component";
import { NgIf } from '@angular/common';
import { SesionService } from './services/sesion.service';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, PantallaLogueoComponent, PantallaInicioComponent, NgIf]
})
export class AppComponent {
  title = 'cajas-seguridad';

  constructor(
    protected _sesionService : SesionService
  ) {}
}
