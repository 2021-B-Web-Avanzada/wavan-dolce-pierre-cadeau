import { Component, OnInit } from '@angular/core';
import { LibroInterface } from 'src/app/services/interfaces/libro.interface';

@Component({
  selector: 'app-ruta-crear-libro',
  templateUrl: './ruta-crear-libro.component.html',
  styleUrls: ['./ruta-crear-libro.component.scss']
})
export class RutaCrearLibroComponent implements OnInit {

  constructor() { }

  libro!: LibroInterface;

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
    console.log(this.libro);
  }

}
