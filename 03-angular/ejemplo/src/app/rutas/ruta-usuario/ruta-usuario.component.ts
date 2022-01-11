import { Component, OnInit } from '@angular/core';
import { UserJphInterface } from 'src/app/servicios/http/interfaces/user-jph.interface';
import { UserJPHService } from 'src/app/servicios/http/user-jph.service';

@Component({
  selector: 'app-ruta-usuario',
  templateUrl: './ruta-usuario.component.html',
  styleUrls: ['./ruta-usuario.component.scss']
})
export class RutaUsuarioComponent implements OnInit {

  constructor(private readonly userJPHService: UserJPHService) {
    this.userJPHService.buscarTodos().subscribe(
      (usuarios: UserJphInterface[]) => {
        console.log(usuarios);
      },
      (error) => {
        console.log(error);
      }

    )
  }

  ngOnInit(): void {
  }

}
