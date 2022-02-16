import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})


export class MenuBarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  urlImagenPerfil = "https://cdn.pixabay.com/photo/2018/04/18/18/56/user-3331257_960_720.png";
}
