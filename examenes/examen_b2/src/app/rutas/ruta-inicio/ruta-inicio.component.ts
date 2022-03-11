import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-ruta-inicio',
  templateUrl: './ruta-inicio.component.html',
  styleUrls: ['./ruta-inicio.component.scss']
})
export class RutaInicioComponent implements OnInit {

  constructor(
    private readonly router: Router
  ) { }

  ngOnInit(): void {
  }

  jugar() {
    console.log('jugar');
  }

  iniciarJuego() {
    Swal.fire({
      title: 'Ingrese su nombre',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Entrar',
      showLoaderOnConfirm: true,
      preConfirm: (login) => {
        if (login === '') {
          Swal.showValidationMessage("Debe ingresar un nombre")
        } else {
          return login
        }
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        if (result.value) {
          console.log(result.value);
          this.router.navigate(['/domino', result.value])
        }
      }
    })
  }
}
