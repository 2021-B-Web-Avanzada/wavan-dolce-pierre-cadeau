import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExplorerComponent } from './comp/explorer/explorer.component';
import { PerfilComponent } from './componentes/perfil/perfil/perfil.component';


const routes: Routes = [

  {
    path: 'categorias',
    component: ExplorerComponent
  },
  {
    path: 'perfil',
    component: PerfilComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
