import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UsuarioInterface } from 'src/app/services/interfaces/usuario.interface';

@Component({
  selector: 'app-ruta-creacion-cuenta',
  templateUrl: './ruta-creacion-cuenta.component.html',
  styleUrls: ['./ruta-creacion-cuenta.component.css']
})
export class RutaCreacionCuentaComponent implements OnInit {
  password = '';

  usuario: UsuarioInterface = {
    nombre: '',
    apellido: '',
    correo: '',
    constraseña: '',
    foto: '',
    cedula: '',
    tipo_Usuario: 'usuario',
  }




  constructor(
    private readonly _authService: AuthService,
    private readonly _router: Router,
  ) { }

  ngOnInit(): void {
  }

  onChangePassword(val: any) {
    this.usuario.constraseña = this.password;
  }

  onChangeFoto(val: any) {
    //this.isEdit = false;
  }

  crearCuenta() {
    this._authService.registrarUsuario(this.usuario).subscribe(
      (usuario: UsuarioInterface) => {
        this._authService.saveSesion(usuario);
        this._router.navigate(['/']);
      }
    );
  }
}
