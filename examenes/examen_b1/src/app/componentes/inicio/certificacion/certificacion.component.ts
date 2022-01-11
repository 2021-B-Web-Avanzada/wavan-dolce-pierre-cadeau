import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-certificacion',
  templateUrl: './certificacion.component.html',
  styleUrls: ['./certificacion.component.scss']
})
export class CertificacionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input()
  certificado = {
    icon: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-university-assets.s3.amazonaws.com/f2/1e0fc0666311e5bb98e7bc1b66e0e4/uniandessquare.png?auto=compress&dpr=1&w=42&fit=crop",
    imagen: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera_assets/ddp/branding/miso/banner.jpg",
    titulo: "Maestría en Ingeniería de Software",
    subtitulo: "from Universidad de los Andes",
    tipo: "100 % en linea",

  }
  colorPrimary = "#211747"
  colorSecondary = "#908BA3"

}
