import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AutorService } from 'src/app/services/http/autor.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-ruta-crear-autor',
  templateUrl: './ruta-crear-autor.component.html',
  styleUrls: ['./ruta-crear-autor.component.scss']
})
export class RutaCrearAutorComponent implements OnInit {
  autor = {
    nombre: '',
    apellido: '',
    edad: '',
    nacionalidad: '',
    direccion: '',
    libros: []
  }

  editando = false;
  idUsuario = ""

  constructor(
    private autorService: AutorService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
    const parametrosRuta$ = this.activatedRoute.params;
    parametrosRuta$.subscribe(
      (parametrosRuta) => {
        this.idUsuario = parametrosRuta['id'];
        if (this.idUsuario) {
          this.autorService.getAAutor(this.idUsuario).subscribe(
            (data: any) => {
              this.editando = true;
              this.autor = data;
            },
            (error: any) => {
              console.log(error)
            },
            () => {
              console.log("termino")
            }
          )
        }
      },
      () => {
      },
      () => {
      }
    );
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log("form is valid")
      if (this.editando) {
        this.autorService.updateAutor(this.autor).subscribe(
          (data: any) => {
            console.log(data)
            Swal.fire(
              'Actualizado!',
              'El autor ha sido actualizado con éxito.',
              'success'
            )
            this.router.navigate(['autores'],
              {
                queryParams: {
                  id: this.idUsuario
                }
              });
          },
          (error: any) => {
            console.log(error)
          },
        )
      } else {
        this.guardarAutor()
      }
    } else {
      console.log(form.controls)
    }
  }

  filteredBanks = [{
    nombre: '',
    apellido: '',
  }];

  guardarAutor() {
    this.autorService.postAutor(this.autor).subscribe(
      (data: any) => {
        console.log(data)
        Swal.fire(
          'Insertado!',
          'El autor ha sido creado con éxito.',
          'success'
        )
        this.router.navigate(['autores'],
          {
            queryParams: {
              id: this.idUsuario
            }
          });
      },
      (error: any) => {
        console.log(error)
      },
      () => {
        console.log("termino")
      }
    )
  }


}
