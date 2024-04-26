import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PantallaLogueoComponent } from './pantallas/pantalla-logueo/pantalla-logueo.component';
import { PantallaInicioComponent } from "./pantallas/pantalla-inicio/pantalla-inicio.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, PantallaLogueoComponent, PantallaInicioComponent]
})
export class AppComponent {
  title = 'cajas-seguridad';
}
