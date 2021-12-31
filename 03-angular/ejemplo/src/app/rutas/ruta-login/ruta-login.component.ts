import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ruta-login',
  templateUrl: './ruta-login.component.html',
  styleUrls: ['./ruta-login.component.scss']
})
export class RutaLoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  mostrarSegundoBanner = true
  arregloUsuarios = [
    {
      id: 1,
      nombre: 'Pierre',
      color: '#00695C',
      link: 'https://www.google.com',
      linkImg: 'https://images.ctfassets.net/lh3zuq09vnm2/yBDals8aU8RWtb0xLnPkI/19b391bda8f43e16e64d40b55561e5cd/How_tracking_user_behavior_on_your_website_can_improve_customer_experience.png'
    },
    {
      id: 2,
      nombre: 'Dolce',
      color: '#1A237E',
      link: 'https://www.google.com',
      linkImg: 'https://johannesippen.com/img/blog/humans-not-users/header.jpg'
    },
    {
      id: 3,
      nombre: 'Ana',
      color: '#1A237E',
      link: 'https://www.google.com',
      linkImg: 'https://www.hubspot.com/hubfs/how-to-create-user-accounts-and-profiles.jpeg'
    },
  ]


  cambiarOcultarBanner() {
    this.mostrarSegundoBanner = !this.mostrarSegundoBanner
  }

}
