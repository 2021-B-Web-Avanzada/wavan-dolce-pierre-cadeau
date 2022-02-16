import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioModule } from './componentes/inicio/inicio.module';
import { ExplorerComponent } from './comp/explorer/explorer.component';
import { CursosComponent } from './comp/cursos/cursos.component';
import { CarouselComponent } from './comp/carousel/carousel.component';

import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { RutaInicioComponent } from './rutas/ruta-inicio/ruta-inicio.component';
import { PerfilModule } from './componentes/perfil/perfil.module';

@NgModule({
  declarations: [
    AppComponent,
    ExplorerComponent,
    CursosComponent,
    CarouselComponent,
    RutaInicioComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    InicioModule,
    PerfilModule,
    CarouselModule,
    ButtonModule,
    ToastModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
