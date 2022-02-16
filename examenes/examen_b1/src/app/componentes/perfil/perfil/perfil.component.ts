import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  urlImagenPerfil = "https://cdn.pixabay.com/photo/2018/04/18/18/56/user-3331257_960_720.png";

}
