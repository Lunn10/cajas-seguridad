import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { IDatosUsuario } from '../models/datos-usuario.model';
import { IRespuestaServer, IRespuestaServerSimple } from '../models/respuesta-server.model'; 

@Injectable({
  providedIn: 'root'
})
export class PeticionesHttpService {

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
    return this._httpClient.post<IDatosUsuario>('http://localhost:8900/users', datosLogueo.value);
  }

  public obtenerUsuarios() : Observable<IRespuestaServer> {
    return this._httpClient.get<IRespuestaServer>('http://localhost:8900/users/showusers');
  }

  public obtenerUsuario(idUser : Number) : Observable<IRespuestaServer> {
    let data = {
      idUser: idUser
    }

    return this._httpClient.post<IRespuestaServer>('http://localhost:8900/users/showoneuser', data);
  }

  public cambiarEstadoUsuario(idUser : Number, activo : boolean) : Observable<IRespuestaServer> {
    let data = {
      idUser: idUser,
      active: !activo
    }

    return this._httpClient.patch<IRespuestaServer>('http://localhost:8900/users/userstate', data);
  }

  public crearUsuario(datosUsuario : FormGroup) : Observable<IRespuestaServer> {
    let datosEnvio = {
      idUser: datosUsuario.value.idUsuario,
      userName: datosUsuario.value.usuario,
      password: datosUsuario.value.password,
      role: datosUsuario.value.tipoUsuario
    }

    return this._httpClient.post<IRespuestaServer>('http://localhost:8900/users/register', datosEnvio);
  }

  public crearTipoUsuario(datosTipoUsuario : FormGroup) : Observable<IRespuestaServer> {
    let datosEnvio = {
      idType: datosTipoUsuario.value.idTipoUsuario,
      role: datosTipoUsuario.value.tipoUsuario
    }

    return this._httpClient.post<IRespuestaServer>('http://localhost:8900/users/registerTypeUser', datosEnvio);
  }

  public obtenerTiposUsuarios(soloActivos : boolean = false) : Observable<IRespuestaServer> {
    let parametros = new HttpParams();
    
    if(soloActivos) {
      parametros = parametros.set('active', soloActivos.toString());
    }

    return this._httpClient.get<IRespuestaServer>('http://localhost:8900/users/showlisttypeusers', { params : parametros });
  }

  public obtenerTipoUsuario(idTipo : Number) : Observable<IRespuestaServer> {
    let data = {
      idType: idTipo
    }

    return this._httpClient.post<IRespuestaServer>('http://localhost:8900/users/showonetypeuser', data);
  }

  public cambiarEstadoTipoUsuario(idType : Number, activo : boolean) : Observable<IRespuestaServer> {
    let data = {
      idType: idType,
      active: !activo
    }

    return this._httpClient.patch<IRespuestaServer>('http://localhost:8900/users/usertypestate', data);
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

    return this._httpClient.post<IRespuestaServer>('http://localhost:8900/client/create', data)
  }

  public obtenerCliente(idCliente : Number) : Observable<IRespuestaServerSimple> {
    let data = {
      id : idCliente
    }

    return this._httpClient.post<IRespuestaServer>('http://localhost:8900/client/getclient', data);
  }

  public listaClientes() : Observable<IRespuestaServer> {
    return this._httpClient.get<IRespuestaServer>('http://localhost:8900/client/clientlist');
  }

  public cambiarEstadoCliente(idCliente : number, estado : boolean) : Observable<IRespuestaServer> {
    let data = {
      idCliente : idCliente,
      estado : !estado
    };

    return this._httpClient.post<IRespuestaServer>('http://localhost:8900/client/changestatus', data);
  }

  public obtenerTiposIVA() : Observable<IRespuestaServer> {
    return this._httpClient.get<IRespuestaServer>('http://localhost:8900/client/ivatypes');
  }

  public obtenerProvincias() : Observable<IRespuestaServer> {
    return this._httpClient.get<IRespuestaServer>('http://localhost:8900/client/statelist');
  }

  public crearArticulo(datosArticulo : FormGroup) : Observable<IRespuestaServer> {
    let data = {
      idArticulo: datosArticulo.value.idArticulo,
      nombreArticulo: datosArticulo.value.nombreArticulo,
      nombreAnterior: datosArticulo.value.nombreAnterior,
      descripcion: datosArticulo.value.descripcion,
      ancho: datosArticulo.value.ancho,
      alto: datosArticulo.value.alto,
      profundidad: datosArticulo.value.profundidad
    };

    return this._httpClient.post<IRespuestaServer>('http://localhost:8900/article/create', data)
  }

  public obtenerArticulo(idArticulo : Number) : Observable<IRespuestaServerSimple> {
    let data = {
      idArticulo: idArticulo
    }

    return this._httpClient.post<IRespuestaServer>('http://localhost:8900/article/getarticle', data);
  }

  public listaArticulos() : Observable<IRespuestaServer> {
    return this._httpClient.get<IRespuestaServer>('http://localhost:8900/article/list');
  }

  public cambiarEstadoArticulo(idArticulo : number, estado : boolean) : Observable<IRespuestaServerSimple> {
    let data = {
      idArticulo: idArticulo,
      estado : !estado
    }

    return this._httpClient.post<IRespuestaServer>('http://localhost:8900/article/changestatus', data);
  }
}
