import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriaComponent } from './categoria/categoria.component';
import { ContenidoComponent } from './contenido/contenido.component';
import { CertificacionComponent } from './certificacion/certificacion.component';
import { ProgramaComponent } from './programa/programa.component';
import { EstadoCursoComponent } from './estado-curso/estado-curso.component';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [
    CategoriaComponent,
    ContenidoComponent,
    CertificacionComponent,
    ProgramaComponent,
    EstadoCursoComponent,
    MenuBarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CategoriaComponent,
    ContenidoComponent,
    CertificacionComponent,
    ProgramaComponent,
    EstadoCursoComponent,
    MenuBarComponent,
    FooterComponent
  ]
})
export class InicioModule { }
