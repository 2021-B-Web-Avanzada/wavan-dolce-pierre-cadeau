import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss']
})
export class CursosComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  matriculas = [
    {
      color: "#00255D",
      titulo: "Desarrollo de páginas con Angular",
      estado: "Completado",
      autor: "Universidad Astral",
    },
    {
      color: "#00255D",
      titulo: "Diseñando páginas web con Bootstrap 4",
      estado: "Atrasado",
      autor: "Universidad Astral",
    },
    {
      color: "#00255D",
      titulo: "Desarrollo de páginas con Angular",
      estado: "En Curso",
      autor: "Universidad Astral",
    }
  ]

}
