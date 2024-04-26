import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormularioLogueoService } from '../../services/formulario-logueo.service';
import { IDatosUsuario } from '../../models/datos-usuario.model';
import { SesionsService } from '../../services/sesion.service';

@Component({
  selector: 'app-pantalla-logueo',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './pantalla-logueo.component.html',
  styleUrl: './pantalla-logueo.component.scss'
})
export class PantallaLogueoComponent {
  formularioLogueo : FormGroup;

  constructor( 
    private form : FormBuilder, 
    private formularioLogueoService : FormularioLogueoService,
    private _sesionService : SesionsService
  ) {
    this.formularioLogueo = this.form.group({
      usuario : ['', Validators.required],
      password : ['', Validators.required]
    })
  }

  logueoUsuario() {
    this.formularioLogueoService.logueoUsuario(this.formularioLogueo).subscribe((data : IDatosUsuario) => {
      // Manejar errores
      this._sesionService.setUsuario(data);
    });
  }
}
