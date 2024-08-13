import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Form, FormGroup } from '@angular/forms';
import { IDatosUsuario } from '../models/datos-usuario.model';
import { IRespuestaServer, IRespuestaServerSimple } from '../models/respuesta-server.model'; 
import { isDeclarationStatement } from 'typescript';

@Injectable({
  providedIn: 'root'
})
export class PeticionesHttpService {
  IP_SERVER : string = 'http://localhost:8900';

  constructor(
    private _httpClient : HttpClient
  ) { }

  private respuestaServer = new BehaviorSubject<string>('');

  public resetRespuestaServer() : void {
    this.respuestaServer.next('');
  }

  public setRespuestaServer(respuesta : string) : void {
    this.respuestaServer.next(respuesta);
  }

  public getRespuestaServer() : Observable<string> {
    return this.respuestaServer.asObservable();
  }

  public logueoUsuario(datosLogueo : FormGroup) : Observable<IDatosUsuario> {
    return this._httpClient.post<IDatosUsuario>(this.IP_SERVER + '/users', datosLogueo.value);
  }

  public obtenerUsuarios() : Observable<IRespuestaServer> {
    return this._httpClient.get<IRespuestaServer>(this.IP_SERVER + '/users/showusers');
  }

  public obtenerUsuario(idUser : Number) : Observable<IRespuestaServer> {
    let data = {
      idUser: idUser
    }

    return this._httpClient.post<IRespuestaServer>(this.IP_SERVER + '/users/showoneuser', data);
  }

  public cambiarEstadoUsuario(idUser : Number, activo : boolean) : Observable<IRespuestaServer> {
    let data = {
      idUser: idUser,
      active: !activo
    }

    return this._httpClient.patch<IRespuestaServer>(this.IP_SERVER + '/users/userstate', data);
  }

  public crearUsuario(datosUsuario : FormGroup) : Observable<IRespuestaServer> {
    let datosEnvio = {
      idUser: datosUsuario.value.idUsuario,
      userName: datosUsuario.value.usuario,
      password: datosUsuario.value.password,
      role: datosUsuario.value.tipoUsuario
    }

    return this._httpClient.post<IRespuestaServer>(this.IP_SERVER + '/users/register', datosEnvio);
  }

  public crearTipoUsuario(datosTipoUsuario : FormGroup) : Observable<IRespuestaServer> {
    let datosEnvio = {
      idType: datosTipoUsuario.value.idTipoUsuario,
      role: datosTipoUsuario.value.tipoUsuario
    }

    return this._httpClient.post<IRespuestaServer>(this.IP_SERVER + '/users/registerTypeUser', datosEnvio);
  }

  public obtenerTiposUsuarios(soloActivos : boolean = false) : Observable<IRespuestaServer> {
    let parametros = new HttpParams();
    
    if(soloActivos) {
      parametros = parametros.set('active', soloActivos.toString());
    }

    return this._httpClient.get<IRespuestaServer>(this.IP_SERVER + '/users/showlisttypeusers', { params : parametros });
  }

  public obtenerTipoUsuario(idTipo : Number) : Observable<IRespuestaServer> {
    let data = {
      idType: idTipo
    }

    return this._httpClient.post<IRespuestaServer>(this.IP_SERVER + '/users/showonetypeuser', data);
  }

  public cambiarEstadoTipoUsuario(idType : Number, activo : boolean) : Observable<IRespuestaServer> {
    let data = {
      idType: idType,
      active: !activo
    }

    return this._httpClient.patch<IRespuestaServer>(this.IP_SERVER + '/users/usertypestate', data);
  }

  public crearCliente(datosCliente : FormGroup) : Observable<IRespuestaServer> {
    const contactosArray : any[] = datosCliente.get('contactos')?.value;
    let contactosFiltrados : any [] = [];
    
    contactosArray.forEach(contacto => {
      if(contacto.nombre && (contacto.telefono || contacto.email)) {
        contactosFiltrados.push(contacto);
      }
    });

    let data = {
      idCliente : datosCliente.value.idCliente,
      nombreCliente: datosCliente.value.nombreCliente,
      nombreFantasia: datosCliente.value.nombreFantasia,
      direccion: datosCliente.value.direccion,
      numeroDireccion: datosCliente.value.numeroDireccion,
      localidad: datosCliente.value.localidad,
      provincia: datosCliente.value.provincia,
      codigoPostal: datosCliente.value.codigoPostal,
      cuit: datosCliente.value.cuit,
      iva: datosCliente.value.iva,
      transporte: datosCliente.value.transporte,
      observacionesTransporte: datosCliente.value.observacionesTransporte,
      contactos: contactosFiltrados
    }

    return this._httpClient.post<IRespuestaServer>(this.IP_SERVER + '/client/create', data)
  }

  public obtenerCliente(idCliente : Number) : Observable<IRespuestaServerSimple> {
    let data = {
      id : idCliente
    }

    return this._httpClient.post<IRespuestaServer>(this.IP_SERVER + '/client/getclient', data);
  }

  public listaClientes() : Observable<IRespuestaServer> {
    return this._httpClient.get<IRespuestaServer>(this.IP_SERVER + '/client/clientlist');
  }

  public cambiarEstadoCliente(idCliente : number, estado : boolean) : Observable<IRespuestaServer> {
    let data = {
      idCliente : idCliente,
      estado : !estado
    };

    return this._httpClient.post<IRespuestaServer>(this.IP_SERVER + '/client/changestatus', data);
  }

  public obtenerTiposIVA() : Observable<IRespuestaServer> {
    return this._httpClient.get<IRespuestaServer>(this.IP_SERVER + '/client/ivatypes');
  }

  public obtenerProvincias() : Observable<IRespuestaServer> {
    return this._httpClient.get<IRespuestaServer>(this.IP_SERVER + '/client/statelist');
  }

  public crear(datosArticulo : FormGroup) : Observable<IRespuestaServer> {
    let data = {
      idArticulo: datosArticulo.value.idArticulo,
      nombreArticulo: datosArticulo.value.nombreArticulo,
      nombreAnterior: datosArticulo.value.nombreAnterior,
      tipoArticulo: datosArticulo.value.tipoArticulo,
      descripcion: datosArticulo.value.descripcion,
      ancho: datosArticulo.value.ancho,
      alto: datosArticulo.value.alto,
      profundidad: datosArticulo.value.profundidad
    };

    return this._httpClient.post<IRespuestaServer>(this.IP_SERVER + '/article/create', data)
  }

  public crearArticulo(datosArticulo : FormGroup) : Observable<IRespuestaServer> {
    let data = {
      idArticulo: datosArticulo.value.idArticulo,
      nombreArticulo: datosArticulo.value.nombreArticulo,
      nombreAnterior: datosArticulo.value.nombreAnterior,
      tipoArticulo: datosArticulo.value.tipoArticulo,
      descripcion: datosArticulo.value.descripcion,
      ancho: datosArticulo.value.ancho,
      alto: datosArticulo.value.alto,
      profundidad: datosArticulo.value.profundidad
    };

    return this._httpClient.post<IRespuestaServer>(this.IP_SERVER + '/article/create', data)
  }

  public crearAccesorio(datosArticulo : FormGroup) : Observable<IRespuestaServer> {
    let data = {
      idArticulo: datosArticulo.value.idAccesorio,
      nombreArticulo: datosArticulo.value.nombreAccesorio,
      tipoArticulo: datosArticulo.value.tipoArticulo,
      descripcion: datosArticulo.value.descripcion,
      relacionesArticulos: datosArticulo.value.articulos
    };

    return this._httpClient.post<IRespuestaServer>(this.IP_SERVER + '/article/createaccesory', data)
  }

  public crearServicio(datosArticulo : FormGroup) : Observable<IRespuestaServer> {
    let data = {
      idArticulo: datosArticulo.value.idServicio,
      nombreArticulo: datosArticulo.value.nombreServicio,
      tipoArticulo: datosArticulo.value.tipoArticulo,
      descripcion: datosArticulo.value.descripcion
    };

    return this._httpClient.post<IRespuestaServer>(this.IP_SERVER + '/article/createservice', data)
  }

  public obtenerArticulo(idArticulo : Number) : Observable<IRespuestaServerSimple> {
    let data = {
      idArticulo: idArticulo
    }

    return this._httpClient.post<IRespuestaServer>(this.IP_SERVER + '/article/getarticle', data);
  }

  public listaArticulos() : Observable<IRespuestaServer> {
    return this._httpClient.get<IRespuestaServer>(this.IP_SERVER + '/article/list');
  }

  public listaArticulosConPrecios(idLista : number) : Observable<IRespuestaServer> {
    let data = {
      id: idLista
    }

    return this._httpClient.post<IRespuestaServer>(this.IP_SERVER + '/article/listwithprices', data);
  }

  public listaAccesorios(idArticulo : number) : Observable<IRespuestaServer> {
    let data = {
      idArticulo: idArticulo
    }

    return this._httpClient.post<IRespuestaServer>(this.IP_SERVER + '/article/getaccesoriesarticles', data);
  }

  public cambiarEstadoArticulo(idArticulo : number, estado : boolean) : Observable<IRespuestaServerSimple> {
    let data = {
      idArticulo: idArticulo,
      estado : !estado
    }

    return this._httpClient.post<IRespuestaServer>(this.IP_SERVER + '/article/changestatus', data);
  }

  public cargarPedido(datosPedido : FormGroup) : Observable<IRespuestaServer> {
    let data : { 
      idPedido: number; 
      idCliente: number; 
      observaciones: string; 
      transporte: string; 
      observacionesTransporte: string; 
      articulos: any[] } = {
      idPedido: datosPedido.value.idPedido,
      idCliente: datosPedido.value.cliente,
      observaciones: datosPedido.value.observaciones,
      transporte: datosPedido.value.transporte,
      observacionesTransporte: datosPedido.value.observacionesTransporte,
      articulos: []
    };
    
    datosPedido.value.articulosCargados.forEach((datosArticulo: { articulo: any; cantidad: number; accesorios: any[] }) => {
      let articuloAgregar : {
        idArticulo: number,
        cantidad: number,
        accesorios: number[]
      } = {
        idArticulo: datosArticulo.articulo,
        cantidad: datosArticulo.cantidad,
        accesorios: []
      }

      let accesorios : number[] = [];

      datosArticulo.accesorios.forEach((datosAccesorio: {id: number; estado: boolean}) => {
        if(datosAccesorio.estado == true) {
          accesorios.push(datosAccesorio.id);
        }
      });

      articuloAgregar.accesorios = accesorios;

      if(articuloAgregar.idArticulo == 0 || articuloAgregar.cantidad == 0) {
        return;
      }

      data.articulos.push(articuloAgregar);
    });

    return this._httpClient.post<IRespuestaServer>(this.IP_SERVER + '/order/createorder', data);
  }

  public obtenerPedido(idPedido : number) : Observable<IRespuestaServerSimple> {
    let data = {
      idPedido: idPedido
    }

    return this._httpClient.post<IRespuestaServer>(this.IP_SERVER + '/order/get', data);
  }

  public obtenerPedidos(filtros : FormGroup) : Observable<IRespuestaServer> {
    let data = {
      idPedido: filtros.value.idPedido,
      fechaPedidoDesde: filtros.value.fechaPedidoDesde,
      fechaPedidoHasta: filtros.value.fechaPedidoHasta,
      estado: filtros.value.estado,
      cliente: filtros.value.cliente,
      articulo: filtros.value.articulo
    }

    return this._httpClient.post<IRespuestaServer>(this.IP_SERVER + '/order/getorders', data);
  }

  public cargarListaPrecios(listaPrecios : FormGroup) : Observable<IRespuestaServer> {
    let preciosActualizados : {
      idArticulo: number,
      precio: number
    }[] = [];

    listaPrecios.value.articulos.forEach((articuloActual: {idArticulo: number, precioActual: number, precio: number}) => {
      let articuloActualizado = {
        idArticulo: articuloActual.idArticulo,
        precio: articuloActual.precioActual,
        precioAnterior: articuloActual.precio
      }

      preciosActualizados.push(articuloActualizado);
    });

    let data = {
      idLista: listaPrecios.value.idLista,
      observaciones: listaPrecios.value.observaciones,
      porcentajeAumento: listaPrecios.value.porcentajeAumento,
      articulos: preciosActualizados
    }

    return this._httpClient.post<IRespuestaServer>(this.IP_SERVER + '/article/createprizeslist', data);
  }

  public obtenerListaPrecios(id : number) {
    let data = {
      id: id
    };

    return this._httpClient.post<IRespuestaServerSimple>(this.IP_SERVER + '/article/getprizeslist', data);
  }

  public obtenerUltimoCAE() {
    let data = {};

    return this._httpClient.post<IRespuestaServerSimple>(this.IP_SERVER + '/ticket/getlastcae', data);
  }

  public cargarFactura(datosFacturar : any) {
    return this._httpClient.post<IRespuestaServer>(this.IP_SERVER + '/ticket/generate', datosFacturar);
  }

  public consultarFacturas(datosConsulta : FormGroup) {
    let data = {
      cliente: datosConsulta.value.cliente,
      fechaDesde: datosConsulta.value.fechaFacturaDesde,
      fechaHasta: datosConsulta.value.fechaFacturaHasta
    };

    return this._httpClient.post<IRespuestaServer>(this.IP_SERVER + '/ticket/gettickets', data);
  }

  public obtenerFacturasImpagas(datosConsulta : FormGroup) {
    let data = {
      cliente: ''
    };

    if(datosConsulta.value.cliente) {
      data.cliente = datosConsulta.value.cliente;
    }
    
    return this._httpClient.post<IRespuestaServer>(this.IP_SERVER + '/ticket/getunpaidtickets', data);
  }

  public obtenerListaBancos() {
    return this._httpClient.get<IRespuestaServer>(this.IP_SERVER + '/administration/banklist');
  }

  public obtenerListaRetenciones() {
    return this._httpClient.get<IRespuestaServer>(this.IP_SERVER + '/administration/retentionlist');
  }

  public cargarPago(datosCobranza : any) {
    return this._httpClient.post<IRespuestaServer>(this.IP_SERVER + '/ticket/generatepayment', datosCobranza);
  }

  public consultarCobranzas(datosConsulta : FormGroup) {
    let data = {
      cliente: datosConsulta.value.cliente,
      fechaDesde: datosConsulta.value.fechaDesde,
      fechaHasta: datosConsulta.value.fechaHasta
    };

    return this._httpClient.post<IRespuestaServer>(this.IP_SERVER + '/ticket/getpayments', data);
  }
}
