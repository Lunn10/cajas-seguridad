import { Routes } from '@angular/router';
import { PantallaSistemaComponent } from './pantallas/pantalla-sistema/pantalla-sistema.component';
import { PantallaAdministracionComponent } from './pantallas/pantalla-administracion/pantalla-administracion.component';
import { PantallaProduccionComponent } from './pantallas/pantalla-produccion/pantalla-produccion.component';

export const routes: Routes = [
    { path: 'administrar-sistema', component: PantallaSistemaComponent },
    { path: 'sistema-administracion', component: PantallaAdministracionComponent },
    { path: 'sistema-produccion', component: PantallaProduccionComponent }
];
