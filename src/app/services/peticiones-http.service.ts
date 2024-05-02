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

  public crearUsuario(datosUsuario : FormGroup) : Observable<IRespuestaServer> {
    let datosEnvio = {
      userName: datosUsuario.value.usuario,
      password: datosUsuario.value.password,
      role: datosUsuario.value.tipoUsuario
    }

    return this._httpClient.post<IRespuestaServer>('http://localhost:8900/users/register', datosEnvio);
  }
}
