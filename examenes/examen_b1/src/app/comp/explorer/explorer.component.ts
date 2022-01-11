import { Component, OnInit } from '@angular/core';
import categorias from './../../data/categorias.json';
@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.scss']
})
export class ExplorerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public categorias: {
    imagen: string,
    nombre: string,
    cursos: string
  }[] = categorias;

}
