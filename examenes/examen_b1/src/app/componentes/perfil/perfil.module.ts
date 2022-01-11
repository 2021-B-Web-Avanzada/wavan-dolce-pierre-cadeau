import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilComponent } from './perfil/perfil.component';
import { LogrosComponent } from './logros/logros.component';



@NgModule({
  declarations: [
    PerfilComponent,
    LogrosComponent
  ],
  imports: [
    CommonModule,
  ]
})
export class PerfilModule { }
