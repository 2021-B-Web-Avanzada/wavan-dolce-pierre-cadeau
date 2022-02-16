import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-contenido',
  templateUrl: './contenido.component.html',
  styleUrls: ['./contenido.component.scss']
})
export class ContenidoComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  @Input()
  contenido = {
    icon: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/http://coursera-university-assets.s3.amazonaws.com/89/a0db8f3ea3417ca90d4f3a4ca1d73e/coursera-projectnetwork-purplesquare.png",
    imagen: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-course-photos.s3.amazonaws.com/1c/101ad1100b42f9ab344ae5f90c6883/Database-2.png",
    tipo: "proyecto",
    titulo: "Statistical Data Visualization with Seaborn From UST",
    subtitulo: "Coursera Project Network"
  };

  @Input()
  icon = "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/http://coursera-university-assets.s3.amazonaws.com/89/a0db8f3ea3417ca90d4f3a4ca1d73e/coursera-projectnetwork-purplesquare.png";

  @Input()
  imagen = "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-course-photos.s3.amazonaws.com/1c/101ad1100b42f9ab344ae5f90c6883/Database-2.png"

  @Input()
  tipo = "proyecto"

  @Input()
  titulo = "Database Operations in MariaDB Using Python From Infosys"

  @Input()
  subtitulo = "Coursera Project Network"

}
