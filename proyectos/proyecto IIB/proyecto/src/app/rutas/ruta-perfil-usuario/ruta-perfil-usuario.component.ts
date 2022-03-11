import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UsuarioInterface } from 'src/app/services/interfaces/usuario.interface';

@Component({
  selector: 'app-ruta-perfil-usuario',
  templateUrl: './ruta-perfil-usuario.component.html',
  styleUrls: ['./ruta-perfil-usuario.component.css']
})
export class RutaPerfilUsuarioComponent implements OnInit {

  usuario!: UsuarioInterface
  isEdit = false;

  password = '';

  constructor(
    private readonly _authService: AuthService,
  ) {

    const user = sessionStorage.getItem("usuario");
    if (user) {
      this.usuario = JSON.parse(user) as UsuarioInterface;
      this.password = this.usuario.constraseña
      console.log("Usuario ruta perfil usuario", this.usuario);
    }
    //console.log("Usuario barra navegacion",this._authService);
    //this.usuario = this._authService.usuarioLogeado;
    // console.log("Usuario barra navegacion",this._authService.usuarioLogeado.apellido);

  }

  ngOnInit(): void {
  }

  editar() {
    if (!this.isEdit) {
      this.isEdit = true;
    } else {
      this._authService.actualizarUsuarioPorId(this.usuario.id!, this.usuario).subscribe(
        (data: UsuarioInterface) => {
          this.usuario = data;
          this.isEdit = false;
          this._authService.saveSesion(data);
        }
      )
    }

  }

  onChangePassword(val: any) {
    //this.isEdit = false;
  }

  onChangeFoto(val: any) {
    //this.isEdit = false;
  }

  //habilitar los inputs



}
