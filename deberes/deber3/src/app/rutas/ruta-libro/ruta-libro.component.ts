import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LibroService } from 'src/app/services/http/libro.service';
import { LibroInterface } from 'src/app/services/interfaces/libro.interface';

@Component({
  selector: 'app-ruta-libro',
  templateUrl: './ruta-libro.component.html',
  styleUrls: ['./ruta-libro.component.scss']
})
export class RutaLibroComponent implements OnInit {

  idUsuario = "";
  idLibro = "";
  libro: LibroInterface | undefined;

  constructor(
    private librosService: LibroService,
    private readonly activatedRoute: ActivatedRoute,) { }

  ngOnInit(): void {
    const parametrosRuta$ = this.activatedRoute.params;
    parametrosRuta$.subscribe(
      (parametrosRuta) => {
        this.idUsuario = parametrosRuta['id'];
        this.idLibro = parametrosRuta['idLibro'];
        const librosData$ = this.librosService.getBooksFtomAutor(this.idUsuario, this.idLibro)
        librosData$.subscribe(
          (data: LibroInterface[]) => {
            this.libro = data[0]
          }
        );
      },
      () => {
      },
      () => {
      }
    );


  }

}
