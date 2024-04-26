import { Injectable } from '@angular/core';
import { IDatosUsuario } from '../models/datos-usuario.model';

@Injectable({
  providedIn: 'root'
})
export class SesionsService {
  sesionIniciada : boolean = false;

  datosUsuario : IDatosUsuario = {
    nombre : '',
    tipoUsuario: ''
  }

  constructor() { }

  public setUsuario(data : IDatosUsuario) {
    this.datosUsuario = data;
    this.sesionIniciada = true;
  }

  public getSesionIniciada() {
    return this.sesionIniciada;
  }
}
