import { query } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserJphInterface } from 'src/app/servicios/http/interfaces/user-jph.interface';
import { UserJPHService } from 'src/app/servicios/http/user-jph.service';

@Component({
  selector: 'app-ruta-usuario',
  templateUrl: './ruta-usuario.component.html',
  styleUrls: ['./ruta-usuario.component.scss']
})
export class RutaUsuarioComponent implements OnInit {
  arreglo: UserJphInterface[] = [];
  buscarUsuario = "";
  constructor(private readonly userJPHService: UserJPHService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.consultarParametros();
    this.actualizarParametrosConsulta();
    this.buscarUsuarios();
  }

  actualizarParametrosConsulta() {
    this.router.navigate(['/app', 'usuario'],
      {
        queryParams: {
          name: this.buscarUsuario
        }
      });
  }

  consultarParametros() {
    const parametrosConsulta$ = this.activatedRoute.queryParams;
    parametrosConsulta$.subscribe(
      (queryParams) => {
        console.log(queryParams);
        this.buscarUsuario = queryParams['name'];
        this.buscarUsuarios();
      },
      () => {
      },
      () => {
      }
    );
  }

  buscarUsuarios() {
    this.userJPHService.buscarTodos(
      { name: this.buscarUsuario }).subscribe(
        (usuarios: UserJphInterface[]) => {
          this.arreglo = usuarios;
          this.buscarUsuario = "";
          console.log(usuarios);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  gestionarUsuario(id: number) {
    this.router.navigate(['/app', 'usuario', id],
      {
       
      });
  }

}
