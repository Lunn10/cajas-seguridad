import { Injectable } from '@angular/core';
import { IDatosUsuario } from '../models/datos-usuario.model';

@Injectable({
  providedIn: 'root'
})
export class SesionService {
  sesionIniciada : boolean = true;

  datosUsuario : IDatosUsuario = {
    nombre : 'nahuel',
    tipoUsuario: 'root'
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
