import { ifStmt } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AutorService } from 'src/app/services/http/autor.service';
import { LibroService } from 'src/app/services/http/libro.service';
import { AutorInterface } from 'src/app/services/interfaces/autor.interface';
import { LibroInterface } from 'src/app/services/interfaces/libro.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ruta-autor',
  templateUrl: './ruta-autor.component.html',
  styleUrls: ['./ruta-autor.component.scss']
})
export class RutaAutorComponent implements OnInit {

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private autorService: AutorService,
    private libroService: LibroService,
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,) { }
  idUsuario = "";
  autor: AutorInterface | undefined;
  cols: any[] = [];
  loading: boolean = true;
  formGroup?: FormGroup;
  bookTitle = ""
  libros: LibroInterface[] = [];

  ngOnInit(): void {
    this.prepararBuscador()
    this.obtenerDatosAutor();

    this.cols = [
      { field: 'titulo', header: 'Titulo' },
      { field: 'precio', header: 'Precio' },
      { field: 'editorial', header: 'Editorial' },
      { field: 'idioma', header: 'Idioma' },
    ];
  }

  private obtenerDatosAutor() {
    const parametrosRuta$ = this.activatedRoute.params;
    parametrosRuta$.subscribe(
      (parametrosRuta) => {
        console.log(parametrosRuta);
        this.idUsuario = parametrosRuta['id'];
        const librosData$ = this.autorService.getAAutor(this.idUsuario);
        librosData$.subscribe(
          (data: AutorInterface) => {
            this.autor = data;
            this.libros = data.libros;
            this.loading = false;
          }
        );
      },
    );
  }

  private prepararBuscador() {
    this.formGroup = this.formBuilder.group({
      bookTitle: new FormControl({
        value: this.bookTitle ? this.bookTitle : '',
        disabled: false//this.usuarioActual
      },
        [Validators.required,
        Validators.minLength(3),]),
    });

    const cambio$ = this.formGroup.valueChanges;
    cambio$.subscribe(
      (data) => {
        if (this.formGroup?.valid) {
          if (this.autor) {
            this.libroService.getBooksFtomAutor(this.idUsuario, data.bookTitle).subscribe(
              (data: any) => {
                this.libros = data;
              }
            )
          }
        } else {
          this.obtenerDatosAutor();
        }
      }
    );
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
        this.libroService.deleteLibro(this.idUsuario, autorNombre).subscribe(
          (data: any) => {
            console.log(data);
            this.obtenerDatosAutor();
            Swal.fire(
              'Elimidado!',
              'El libro ha sido elimidado con éxito.',
              'success'
            )
          }
        )
      }
    })
  }
}
