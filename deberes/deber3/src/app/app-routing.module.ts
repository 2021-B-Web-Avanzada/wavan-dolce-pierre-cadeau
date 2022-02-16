import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RutaAutorComponent } from './rutas/ruta-autor/ruta-autor.component';
import { RutaAutoresComponent } from './rutas/ruta-autores/ruta-autores.component';
import { RutaCrearAutorComponent } from './rutas/ruta-crear-autor/ruta-crear-autor.component';
import { RutaCrearLibroComponent } from './rutas/ruta-crear-libro/ruta-crear-libro.component';
import { RutaLibroComponent } from './rutas/ruta-libro/ruta-libro.component';
import { RutaLibrosComponent } from './rutas/ruta-libros/ruta-libros.component';

const routes: Routes = [
  {
    path: 'autores',
    component: RutaAutoresComponent
  },
  {
    path: 'autor/:id',
    component: RutaAutorComponent
  },
  {
    path: 'autor/:id/libro/:idLibro',
    component: RutaCrearLibroComponent
  },
  {
    path: 'libros',
    component: RutaLibrosComponent
  },
  {
    path: 'crearLibro/:id',
    component: RutaCrearLibroComponent
  },
  {
    path: 'crearAutor',
    component: RutaCrearAutorComponent
  }, {
    path: 'crearAutor/:id',
    component: RutaCrearAutorComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
