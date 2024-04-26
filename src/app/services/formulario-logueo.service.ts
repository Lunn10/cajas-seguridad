import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDatosUsuario } from '../models/datos-usuario.model';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormularioLogueoService {

  constructor(
    private _httpClient : HttpClient
  ) { }

  public logueoUsuario(datosLogueo : FormGroup) : Observable<IDatosUsuario> {
    return this._httpClient.post<IDatosUsuario>('urlprueba', datosLogueo);
  } 
}
