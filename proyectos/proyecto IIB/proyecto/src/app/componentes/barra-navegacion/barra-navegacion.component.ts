import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UsuarioInterface } from 'src/app/services/interfaces/usuario.interface';

@Component({
  selector: 'app-barra-navegacion',
  templateUrl: './barra-navegacion.component.html',
  styleUrls: ['./barra-navegacion.component.css']
})
export class BarraNavegacionComponent implements OnInit {

  usuario!: UsuarioInterface

  constructor(
     readonly _authService: AuthService,
  ) {
    console.log("esta logueado en barra navegacion: "+this._authService.usuarioLogeado);
    if (this._authService.estaLogeado) {
      const user = sessionStorage.getItem("usuario");
      if (user) {
        this.usuario = JSON.parse(user) as UsuarioInterface;
        this._authService.estaLogeado = true;
      }
    }
  }

  cerrarSesion() {
    this._authService.cerrarSesion();
    this._authService.estaLogeado = false;
  }

  ngOnInit(): void {

  }

}
