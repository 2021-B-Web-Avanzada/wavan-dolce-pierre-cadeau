import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuloInventarioRoutingModule } from './modulo-inventario-routing.module';
import { RutaReporteComponent } from './rutas/ruta-reporte/ruta-reporte.component';


@NgModule({
  declarations: [
    RutaReporteComponent
  ],
  imports: [
    CommonModule,
    ModuloInventarioRoutingModule
  ]
})
export class ModuloInventarioModule { }
