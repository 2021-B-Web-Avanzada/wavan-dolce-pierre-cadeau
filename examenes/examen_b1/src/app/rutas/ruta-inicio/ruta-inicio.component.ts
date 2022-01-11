import { Component, OnInit } from '@angular/core';
import contenidos from './../../data/all_data.json';

@Component({
  selector: 'app-ruta-inicio',
  templateUrl: './ruta-inicio.component.html',
  styleUrls: ['./ruta-inicio.component.scss']
})
export class RutaInicioComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public contenidos: {
    icon: string,
    imagen: string,
    tipo: string,
    titulo: string,
    subtitulo: string,
  }[] = contenidos.filter((cont: { tipo: string; }) => { return cont.tipo === 'CURSO' });


  public certificados: {
    icon: string,
    imagen: string,
    tipo: string,
    titulo: string,
    subtitulo: string,
  }[] = contenidos.filter((cont: { tipo: string; }) => { return cont.tipo === 'CERTIFICADO PROFESIONAL' });


}
