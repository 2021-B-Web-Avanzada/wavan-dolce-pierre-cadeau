import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-estado-curso',
  templateUrl: './estado-curso.component.html',
  styleUrls: ['./estado-curso.component.scss']
})
export class EstadoCursoComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  @Input()
  matricula = {
    color: "#00255D",
    titulo: "Desarrollo de páginas con Angular",
    estado: "Completado",
    autor: "Universidad Astral",
  }
}
