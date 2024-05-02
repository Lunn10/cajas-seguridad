import { Routes } from '@angular/router';
import { PantallaSistemaComponent } from './pantallas/pantalla-sistema/pantalla-sistema.component';
import { PantallaAdministracionComponent } from './pantallas/pantalla-administracion/pantalla-administracion.component';
import { PantallaProduccionComponent } from './pantallas/pantalla-produccion/pantalla-produccion.component';
import { PantallaInicioComponent } from './pantallas/pantalla-inicio/pantalla-inicio.component';
import { CrearUsuarioComponent } from './pantallas/pantalla-sistema/funcionalidades/crear-usuario/crear-usuario.component';
import { ListaUsuariosComponent } from './pantallas/pantalla-sistema/funcionalidades/lista-usuarios/lista-usuarios.component';
import { ListaTiposUsuarioComponent } from './pantallas/pantalla-sistema/funcionalidades/lista-tipos-usuario/lista-tipos-usuario.component';
import { CrearTipoUsuarioComponent } from './pantallas/pantalla-sistema/funcionalidades/crear-tipo-usuario/crear-tipo-usuario.component';

export const routes: Routes = [
    { path: '', component: PantallaInicioComponent },
    { path: 'administrar-sistema', component: PantallaSistemaComponent, children: [
        { path: 'crear-usuario', component: CrearUsuarioComponent },
        { path: 'lista-usuarios', component: ListaUsuariosComponent },
        { path: 'crear-tipo-usuario', component: CrearTipoUsuarioComponent },
        { path: 'lista-tipos-usuario', component: ListaTiposUsuarioComponent }
        ] },
    { path: 'sistema-administracion', component: PantallaAdministracionComponent },
    { path: 'sistema-produccion', component: PantallaProduccionComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
