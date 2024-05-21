import { Routes } from '@angular/router';
import { PantallaSistemaComponent } from './pantallas/pantalla-sistema/pantalla-sistema.component';
import { PantallaAdministracionComponent } from './pantallas/pantalla-administracion/pantalla-administracion.component';
import { PantallaProduccionComponent } from './pantallas/pantalla-produccion/pantalla-produccion.component';
import { PantallaInicioComponent } from './pantallas/pantalla-inicio/pantalla-inicio.component';
import { CrearUsuarioComponent } from './pantallas/pantalla-sistema/funcionalidades/crear-usuario/crear-usuario.component';
import { ListaUsuariosComponent } from './pantallas/pantalla-sistema/funcionalidades/lista-usuarios/lista-usuarios.component';
import { ListaTiposUsuarioComponent } from './pantallas/pantalla-sistema/funcionalidades/lista-tipos-usuario/lista-tipos-usuario.component';
import { CrearTipoUsuarioComponent } from './pantallas/pantalla-sistema/funcionalidades/crear-tipo-usuario/crear-tipo-usuario.component';
import { CargarClienteComponent } from './pantallas/pantalla-administracion/clientes/cargar-cliente/cargar-cliente.component';
import { ConsultarClienteComponent } from './pantallas/pantalla-administracion/clientes/consultar-cliente/consultar-cliente.component';
import { ConsultarFacturaComponent } from './pantallas/pantalla-administracion/facturas/consultar-factura/consultar-factura.component';
import { CargarFacturaComponent } from './pantallas/pantalla-administracion/facturas/cargar-factura/cargar-factura.component';
import { PantallaPedidosComponent } from './pantallas/pantalla-pedidos/pantalla-pedidos.component';
import { ConsultarArticuloComponent } from './pantallas/pantalla-pedidos/articulos/consultar-articulo/consultar-articulo.component';
import { CargarArticuloComponent } from './pantallas/pantalla-pedidos/articulos/cargar-articulo/cargar-articulo.component';

export const routes: Routes = [
    { path: '', component: PantallaInicioComponent },
    { path: 'administrar-sistema', component: PantallaSistemaComponent, children: [
        { path: 'crear-usuario', component: CrearUsuarioComponent },
        { path: 'crear-usuario/:idUser', component: CrearUsuarioComponent },
        { path: 'lista-usuarios', component: ListaUsuariosComponent },
        { path: 'crear-tipo-usuario', component: CrearTipoUsuarioComponent },
        { path: 'crear-tipo-usuario/:idType', component: CrearTipoUsuarioComponent },
        { path: 'lista-tipos-usuario', component: ListaTiposUsuarioComponent }
    ] },
    { path: 'sistema-administracion', component: PantallaAdministracionComponent, children: [
        { path: 'cargar-cliente', component: CargarClienteComponent },
        { path: 'cargar-cliente/:id', component: CargarClienteComponent },
        { path: 'consultar-cliente', component: ConsultarClienteComponent },
        { path: 'cargar-factura', component: CargarFacturaComponent },
        { path: 'consultar-factura', component: ConsultarFacturaComponent }
    ] },
    { path: 'sistema-pedidos', component: PantallaPedidosComponent, children: [
        { path: 'lista-articulos', component: ConsultarArticuloComponent },
        { path: 'cargar-articulo', component: CargarArticuloComponent }
    ] },
    { path: 'sistema-produccion', component: PantallaProduccionComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
