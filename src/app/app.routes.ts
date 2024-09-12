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
import { CargarPedidoComponent } from './pantallas/pantalla-pedidos/pedidos/cargar-pedido/cargar-pedido.component';
import { ConsultarPedidosComponent } from './pantallas/pantalla-pedidos/pedidos/consultar-pedidos/consultar-pedidos.component';
import { ConsultarListaPreciosComponent } from './pantallas/pantalla-administracion/articulos/consultar-lista-precios/consultar-lista-precios.component';
import { CargarListaPreciosComponent } from './pantallas/pantalla-administracion/articulos/cargar-lista-precios/cargar-lista-precios.component';
import { CargarPagoComponent } from './pantallas/pantalla-administracion/pagos/cargar-pago/cargar-pago.component';
import { ConsultarPagosComponent } from './pantallas/pantalla-administracion/pagos/consultar-pagos/consultar-pagos.component';
import { ConsultarNotaCreditoComponent } from './pantallas/pantalla-administracion/notas-credito/consultar-nota-credito/consultar-nota-credito.component';
import { CargarNotaCreditoComponent } from './pantallas/pantalla-administracion/notas-credito/cargar-nota-credito/cargar-nota-credito.component';
import { CuentaCorrienteComponent } from './pantallas/pantalla-administracion/clientes/cuenta-corriente/cuenta-corriente.component';
import { CargarNotaDebitoComponent } from './pantallas/pantalla-administracion/notas-debito/cargar-nota-debito/cargar-nota-debito.component';
import { ConsultarNotaDebitoComponent } from './pantallas/pantalla-administracion/notas-debito/consultar-nota-debito/consultar-nota-debito.component';
import { GenerarPdfFacturaComponent } from './pantallas/pantalla-administracion/facturas/generar-pdf-factura/generar-pdf-factura.component';

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
        { path: 'cuenta-corriente/:id', component: CuentaCorrienteComponent },
        { path: 'cargar-factura', component: CargarFacturaComponent },
        { path: 'consultar-factura', component: ConsultarFacturaComponent },
        { path: 'cargar-nota-credito', component: CargarNotaCreditoComponent },
        { path: 'consultar-nota-credito', component: ConsultarNotaCreditoComponent },
        { path: 'cargar-nota-debito', component: CargarNotaDebitoComponent },
        { path: 'consultar-nota-debito', component: ConsultarNotaDebitoComponent },
        { path: 'cargar-pago', component: CargarPagoComponent },
        { path: 'consultar-pagos', component: ConsultarPagosComponent },
        { path: 'cargar-lista-precios', component: CargarListaPreciosComponent },
        { path: 'cargar-lista-precios/:id', component: CargarListaPreciosComponent },
        { path: 'consultar-lista-precios', component: ConsultarListaPreciosComponent },
        { path: 'generar-factura/:id', component: GenerarPdfFacturaComponent }
    ] },
    { path: 'sistema-pedidos', component: PantallaPedidosComponent, children: [
        { path: 'lista-articulos', component: ConsultarArticuloComponent },
        { path: 'cargar-articulo', component: CargarArticuloComponent },
        { path: 'cargar-articulo/:id', component: CargarArticuloComponent },
        { path: 'consultar-pedidos', component: ConsultarPedidosComponent },
        { path: 'cargar-pedido', component: CargarPedidoComponent },
        { path: 'cargar-pedido/:id', component: CargarPedidoComponent }
    ] },
    { path: 'sistema-produccion', component: PantallaProduccionComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
