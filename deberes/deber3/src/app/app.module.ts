import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RutaAutoresComponent } from './rutas/ruta-autores/ruta-autores.component';
import { RutaAutorComponent } from './rutas/ruta-autor/ruta-autor.component';
import { RutaLibrosComponent } from './rutas/ruta-libros/ruta-libros.component';
import { RutaLibroComponent } from './rutas/ruta-libro/ruta-libro.component';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { RutaCrearLibroComponent } from './rutas/ruta-crear-libro/ruta-crear-libro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RutaCrearAutorComponent } from './rutas/ruta-crear-autor/ruta-crear-autor.component';

@NgModule({
  declarations: [
    AppComponent,
    RutaAutoresComponent,
    RutaAutorComponent,
    RutaLibrosComponent,
    RutaLibroComponent,
    RutaCrearLibroComponent,
    RutaCrearAutorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TableModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
