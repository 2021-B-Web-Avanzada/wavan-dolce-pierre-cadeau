import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-programa',
  templateUrl: './programa.component.html',
  styleUrls: ['./programa.component.scss']
})
export class ProgramaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input()
  certificado = {
    imagen: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://d15cw65ipctsrr.cloudfront.net/14/b2d530f1ad11e7ab380fc0c6c817a8/Search-Thumbnail.jpg?auto=format%2Ccompress&dpr=1&w=250",
    titulo: "Google IT Support",
    subtitulo: "Google",
    tipo: "Certificado profesional",
    icon: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/http://coursera-university-assets.s3.amazonaws.com/4a/cb36835ae3421187080898a7ecc11d/Google-G_360x360.png?auto=format%2Ccompress&dpr=1&w=80",

  }
  color = "#00255D"
}
