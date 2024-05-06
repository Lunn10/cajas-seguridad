import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { IDatosUsuario } from '../models/datos-usuario.model';
import { IRespuestaServer } from '../models/respuesta-server.model'; 

@Injectable({
  providedIn: 'root'
})
export class PeticionesHttpService {

  constructor(
    private _httpClient : HttpClient
  ) { }

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

    console.log(datosEnvio);

    return this._httpClient.post<IRespuestaServer>('http://localhost:8900/users/registerTypeUser', datosEnvio);
  }

  public obtenerTiposUsuarios() : Observable<IRespuestaServer> {
    return this._httpClient.get<IRespuestaServer>('http://localhost:8900/users/showlisttypeusers');
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
}
