import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner-imagenes',
  templateUrl: './banner-imagenes.component.html',
  styleUrls: ['./banner-imagenes.component.scss']
})
export class BannerImagenesComponent implements OnInit {
  nombre = "Pierre";
  apellido = "Dolce"
  mascotas = {
    cachetes: {
      edad: 7,
    }
  }

  @Input()
  url = "https://www.google.com"

  @Input()
  urlImagen = "https://1.bp.blogspot.com/-79DdxzZkDog/T76QV6v5IuI/AAAAAAAAAEY/6DzpGZzsmfA/s320/homerocatolico_456_336.jpg"
  fecha = new Date();
  sueldo = 5000;

  @Input()
  color = "yellow";




  constructor() { }

  ngOnInit(): void {
  }

  ejecutarEventoClick() {
    console.log({ mensaje: "click" });
  }

  ejecutarEventoBlur() {
    console.log({ mensaje: "blur" });
  }





}
