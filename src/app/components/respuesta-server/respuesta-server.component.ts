import { Component, OnDestroy,  } from '@angular/core';
import { PeticionesHttpService } from '../../services/peticiones-http.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-respuesta-server',
  standalone: true,
  imports: [],
  templateUrl: './respuesta-server.component.html',
  styleUrl: './respuesta-server.component.scss'
})
export class RespuestaServerComponent implements OnDestroy {
  private suscripcionFormulario : Subscription;

  constructor (
    private _matSnackBar : MatSnackBar,
    private _peticionesHttp : PeticionesHttpService
  ) {
    this.suscripcionFormulario = this._peticionesHttp.getRespuestaServer().subscribe({
      next: (estado) => {
        if(estado) {
          this.mostrarSnackBar(estado);
        }
      }
    })
  }

  ngOnDestroy() {
    this.suscripcionFormulario.unsubscribe();
  }

  mostrarSnackBar(message: string) {
    let matSnackBarRef = this._matSnackBar.open(message, 'Cerrar', {
      panelClass: 'my-custom-snackbar',
      horizontalPosition: 'right'
    });

    matSnackBarRef.onAction().subscribe(
      () => {
        this._peticionesHttp.resetRespuestaServer();
      }
    )
  }
}