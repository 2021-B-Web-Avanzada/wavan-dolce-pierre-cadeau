import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExplorerComponent } from './comp/explorer/explorer.component';
import { PerfilComponent } from './componentes/perfil/perfil/perfil.component';


const routes: Routes = [
];

@NgModule({
  imports: [RouterModule.forRoot(routes), RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
