import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AutorService } from 'src/app/services/http/autor.service';
import { AutorInterface } from 'src/app/services/interfaces/autor.interface';
import { LibroInterface } from 'src/app/services/interfaces/libro.interface';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-ruta-autores',
  templateUrl: './ruta-autores.component.html',
  styleUrls: ['./ruta-autores.component.scss']
})
export class RutaAutoresComponent implements OnInit {

  autores: AutorInterface[] = [];
  cols: any[] = [];
  loading: boolean = true;
  autorBuscar = ""
  formGroup?: FormGroup;


  constructor(
    private autoresService: AutorService,
    private readonly formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.obtenerAutores();

    this.cols = [
      { field: 'nombre', header: 'Nombre' },
      { field: 'apellido', header: 'Apellido' },
      { field: 'edad', header: 'Edad' },
      { field: 'direccion', header: 'Direccion' },
      { field: 'nacionalidad', header: 'Nacionalidad' }
    ];

    this.prepararBuscador()
  }

  private obtenerAutores() {
    const autoresData$ = this.autoresService.getAllAutors();
    autoresData$.subscribe(
      (data: AutorInterface[]) => {
        this.autores = data;
        this.loading = false;
      }
    );
  }

  showBooks(librosAutor: LibroInterface[]) {
    console.log(librosAutor);
  }

  private prepararBuscador() {
    this.formGroup = this.formBuilder.group({
      autorName: new FormControl({
        value: this.autorBuscar ? this.autorBuscar : '',
        disabled: false//this.usuarioActual
      },
        [Validators.required,
        Validators.minLength(3),]),
    });

    const cambio$ = this.formGroup.valueChanges;
    cambio$.subscribe(
      (data) => {
        if (this.formGroup?.valid) {
          this.obtenerAutores();
          this.autores = this.autores.filter(
            (libro) => libro.nombre.toLowerCase().includes(data.autorName.toLowerCase())
          )
        } else {
          this.obtenerAutores();
        }
      }
    );
  }

  abrirModal() {
    Swal.fire({
      title: 'Error!',
      text: 'Do you want to continue',
      icon: 'error',
      confirmButtonText: 'Cool'
    })
  }

  buscarAutor() {
    console.log(this.autorBuscar);
  }

  showAlertDelete(autorNombre: string) {
    Swal.fire({
      title: 'Advertencia!',
      text: 'Deseas realmente continuar',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminalo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.autoresService.deleteAutor(autorNombre).subscribe(
          (data: any) => {
            console.log(data);
            this.obtenerAutores();
            Swal.fire(
              'Elimidado!',
              'El autor ha sido elimidado con éxito.',
              'success'
            )
          }
        )

      }
    })
  }

}
