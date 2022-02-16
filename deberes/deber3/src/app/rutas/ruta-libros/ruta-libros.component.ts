import { Component, OnInit } from '@angular/core';
import { AutorService } from 'src/app/services/http/autor.service';
import { AutorInterface } from 'src/app/services/interfaces/autor.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ruta-libros',
  templateUrl: './ruta-libros.component.html',
  styleUrls: ['./ruta-libros.component.scss']
})
export class RutaLibrosComponent implements OnInit {


  libros: AutorInterface[] = [];
  cols: any[] = [];
  loading: boolean = true;

  constructor(private librosService: AutorService) { }

  ngOnInit() {
    const librosData$ = this.librosService.getAllAutors()


    librosData$.subscribe(
      (data: AutorInterface[]) => {
        this.libros = data
        this.loading = false;
      }
    );

    this.cols = [
      { field: 'nombre', header: 'Nombre' },
      { field: 'apellido', header: 'Apellido' },
      { field: 'edad', header: 'Edad' },
      { field: 'direccion', header: 'Direccion' },
      { field: 'nacionalidad', header: 'Nacionalidad' }
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

  showAlertDelete(autorNombre: string) {
    Swal.fire({
      title: 'Warning!',
      text: 'Do you want to continue',
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
