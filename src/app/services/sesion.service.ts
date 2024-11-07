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

  setUsuario(data : IDatosUsuario) {
    this.datosUsuario = data;
    this.sesionIniciada = true;
  }

  getSesionIniciada() {
    return this.sesionIniciada;
  }


}
