import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LibroService } from 'src/app/services/http/libro.service';
import { LibroInterface } from 'src/app/services/interfaces/libro.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ruta-crear-libro',
  templateUrl: './ruta-crear-libro.component.html',
  styleUrls: ['./ruta-crear-libro.component.scss']
})
export class RutaCrearLibroComponent implements OnInit {
  formGroup?: FormGroup;
  constructor(
    private libroService: LibroService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
  ) { }

  libro!: LibroInterface;
  idUsuario = ""
  idLibro = ""
  isEdit = false;

  ngOnInit(): void {
    this.libro = {
      titulo: '',
      numeroPaginas: 0,
      leido: false,
      precio: 0,
      editorial: '',
      isbn: '',
      peso: 0,
      idioma: '',
      fecha: this.formatDate(new Date()),
      dimension: {
        ancho: 0,
        alto: 0
      }
    }

    const parametrosRuta$ = this.activatedRoute.params;
    parametrosRuta$.subscribe(
      (parametrosRuta) => {
        this.idUsuario = parametrosRuta['id'];
        this.idLibro = parametrosRuta['idLibro'];
        if (this.idLibro) {
          this.libroService.getBooksFtomAutor(this.idUsuario, this.idLibro).subscribe(
            (data: LibroInterface[]) => {
              this.libro = data[0];
              this.isEdit = true
            }
          )
        }
      }
    );
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      if (this.isEdit) {
        this.libroService.updateLibro(this.idUsuario, this.libro).subscribe(
          (data: any) => {
            console.log(data);
            Swal.fire(
              'Actualizado!',
              'El libro ha sido actualizado con éxito!',
              'success'
            )
            this.router.navigate(['autor', this.idUsuario],
              {
                queryParams: {
                  id: this.idUsuario
                }
              });
          }
        )
      } else {
        this.guardarLibro()
      }
    } else {
      console.log(form.controls)
    }
  }

  padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
  }

  formatDate(date: Date) {
    let datef = [date.getFullYear(), this.padTo2Digits(date.getMonth() + 1), this.padTo2Digits(date.getDate()),
    ].join('-');
    return datef;
  }

  guardarLibro() {
    this.libroService.postLibro(this.idUsuario, this.libro).subscribe(
      (data: any) => {
        console.log(data);
        Swal.fire(
          'Insertado!',
          'El libro ha sido creado con éxito.',
          'success'
        )
        this.router.navigate(['autor', this.idUsuario],
          {
            queryParams: {
              id: this.idUsuario
            }
          });
      }
    )
  }

}
