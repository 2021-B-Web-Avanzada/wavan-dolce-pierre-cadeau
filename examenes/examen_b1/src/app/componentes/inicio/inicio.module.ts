import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriaComponent } from './categoria/categoria.component';
import { ContenidoComponent } from './contenido/contenido.component';
import { CertificacionComponent } from './certificacion/certificacion.component';
import { ProgramaComponent } from './programa/programa.component';
import { EstadoCursoComponent } from './estado-curso/estado-curso.component';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule, Routes } from '@angular/router';
import { PerfilComponent } from '../perfil/perfil/perfil.component';
import { RutaInicioComponent } from 'src/app/rutas/ruta-inicio/ruta-inicio.component';

const routes: Routes = [
  {
    path: '',
    component: RutaInicioComponent
  },
  {
    path: 'perfil',
    component: PerfilComponent
  }
];

@NgModule({
  declarations: [
    CategoriaComponent,
    ContenidoComponent,
    CertificacionComponent,
    ProgramaComponent,
    EstadoCursoComponent,
    MenuBarComponent,
    FooterComponent,
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    CategoriaComponent,
    ContenidoComponent,
    CertificacionComponent,
    ProgramaComponent,
    EstadoCursoComponent,
    MenuBarComponent,
    FooterComponent,
    HeaderComponent,
  ]
})
export class InicioModule { }
