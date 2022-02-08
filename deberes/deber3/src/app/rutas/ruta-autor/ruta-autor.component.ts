import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AutorService } from 'src/app/services/http/autor.service';
import { AutorInterface } from 'src/app/services/interfaces/autor.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ruta-autor',
  templateUrl: './ruta-autor.component.html',
  styleUrls: ['./ruta-autor.component.scss']
})
export class RutaAutorComponent implements OnInit {

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private librosService: AutorService,
    private readonly router: Router,) { }
  idUsuario = "";
  autor: AutorInterface | undefined;
  cols: any[] = [];
  loading: boolean = true;

  ngOnInit(): void {

    const parametrosRuta$ = this.activatedRoute.params;
    parametrosRuta$.subscribe(
      (parametrosRuta) => {
        console.log(parametrosRuta);
        this.idUsuario = parametrosRuta['id'];
        const librosData$ = this.librosService.getAAutor(this.idUsuario)
        librosData$.subscribe(
          (data: AutorInterface) => {
            console.log(data);
            this.autor = data;
            this.loading = false;
          }
        );
      },
      () => {
      },
      () => {
      }
    );


    this.cols = [
      { field: 'titulo', header: 'Titulo' },
      { field: 'numeroPaginas', header: 'Páginas' },
      { field: 'precio', header: 'Precio' },
      { field: 'editorial', header: 'Editorial' },
      { field: 'isbn', header: 'ISBN' },
      { field: 'peso', header: 'Peso' },
      { field: 'idioma', header: 'Idioma' },
      { field: 'fecha', header: 'Fecha' },
    ];
  }


  abrirModal() {
    Swal.fire({
      title: 'Error!',
      text: 'Do you want to continue',
      icon: 'error',
      confirmButtonText: 'Cool'
    })
  }

  editarLibro(titulo: string) {

  }

  showAlertDelete(titulo: string) {
    Swal.fire({
      title: 'Warning!',
      text: 'Do you want to continue delete ' + titulo,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }
}
