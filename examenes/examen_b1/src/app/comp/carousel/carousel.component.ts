import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  constructor() { 

    
  }

  ngOnInit(): void {
    
  }
  @Input()
  public contenidos: { icon: string; imagen: string; tipo: string; titulo: string; subtitulo: string; }[] = []

  

}


