import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RutaDominoComponent } from './rutas/ruta-domino/ruta-domino.component';
import { RutaInicioComponent } from './rutas/ruta-inicio/ruta-inicio.component';

const routes: Routes = [
  {
    path: 'domino/:nombre',
    component: RutaDominoComponent,
  },
  {
    path: '',
    component: RutaInicioComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
