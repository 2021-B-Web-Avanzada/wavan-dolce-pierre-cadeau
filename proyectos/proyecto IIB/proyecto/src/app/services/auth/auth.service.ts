import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { UsuarioInterface } from "../interfaces/usuario.interface";

@Injectable()
export class AuthService {
  estaLogeado = false;
  esAdministrador = false;
  usuarioLogeado!: UsuarioInterface;


  isLogin() {
    return this.estaLogeado;
  }

  ngOnInit() {
  }

  constructor(private http: HttpClient) {
    const user = sessionStorage.getItem("usuario");
    if (user) {
      this.usuarioLogeado = JSON.parse(user) as UsuarioInterface;
      this.estaLogeado = true;
      console.log("usuario service", this.usuarioLogeado);
    }
  }

  isAdmin() {
    if (this.usuarioLogeado) {
      if (this.usuarioLogeado.tipo_Usuario == "Admin") {
        this.esAdministrador = true;
      } else {
        this.esAdministrador = false;
      }
    }
    return this.esAdministrador;
  }

  getUsuarios(): Observable<UsuarioInterface[]> {
    const url = environment.urlAPI + "usuarios/";
    return this.http
      .get(url)
      .pipe(
        map(
          (respuesta: Object) => respuesta as UsuarioInterface[]
        )
      );
  }

  getUsuario(id: number): Observable<UsuarioInterface> {
    const url = environment.urlAPI + `usuarios/${id}/`;
    return this.http
      .get(url)
      .pipe(
        map(
          (respuesta: Object) => respuesta as UsuarioInterface
        )
      );
  }

  actualizarUsuarioPorId(idUsuario: number, datosActualizar: UsuarioInterface): Observable<UsuarioInterface> {
    const url = environment.urlAPI + 'usuarios/' + idUsuario + "/";
    return this.http.put(url, datosActualizar)
      .pipe(map((resultadoEnData) => resultadoEnData as UsuarioInterface))
  }

  login(cedula: string, password: string): Observable<UsuarioInterface> {
    const url = environment.urlAPI + `usuarios/?cedula=${cedula}&contrasena=${password}`;
    return this.http
      .get(url)
      .pipe(
        map(
          (respuesta: Object) => respuesta as UsuarioInterface
        )
      );
  }

  registrarUsuario(usuario: UsuarioInterface): Observable<UsuarioInterface> {
    const url = environment.urlAPI + "usuarios/";
    return this.http.post(url, usuario)
      .pipe(map((resultadoEnData) => resultadoEnData as UsuarioInterface))
  }



  saveSesion(usuario: UsuarioInterface) {
    sessionStorage.setItem('usuario', JSON.stringify(usuario));
  }

  cerrarSesion() {
    sessionStorage.removeItem('usuario');
  }
}


