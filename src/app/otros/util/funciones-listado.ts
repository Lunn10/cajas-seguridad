import { PeticionesHttpService } from "../../services/peticiones-http.service";
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class funcionesListado {
    constructor(
        private _peticionesHttp : PeticionesHttpService,
    ) {}

    listaClientes() {
        let listaClientes : any[] = [];

        this._peticionesHttp.listaClientes().subscribe({
            next : (data) => {
                if(data.error) {
                    this._peticionesHttp.setRespuestaServer(data.message);
                } else {
                    listaClientes = data.data;
                }
            },
            error : (data) => {
                this._peticionesHttp.setRespuestaServer(data.message);
            }
        })

        return listaClientes;
    }
}
