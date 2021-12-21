import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RutaLoginComponent } from './rutas/ruta-login/ruta-login.component';
import { RutaForbiddenComponent } from './rutas/ruta-forbidden/ruta-forbidden.component';
import { RutaNotFoundComponent } from './rutas/ruta-not-found/ruta-not-found.component';
import { RutaInicioComponent } from './rutas/ruta-inicio/ruta-inicio.component';
import { RutaUsuarioComponent } from './rutas/ruta-usuario/ruta-usuario.component';
import { RutaPostComponent } from './rutas/ruta-post/ruta-post.component';
import { RutaAppComponent } from './rutas/ruta-app/ruta-app.component';
import { AuthService } from 'src/servicios/auth/auth.service';
import { EstaLogeadoGuard } from 'src/servicios/auth/esta-logeado.guard';
import { EsAdministradorGuard } from 'src/servicios/auth/es-administrador.guard';
import { RutaBodegaComponent } from './modulos/modulo-inventario/rutas/ruta-bodega/ruta-bodega.component';
import { BannerImagenesModule } from './componentes/banner-imagenes/banner-imagenes.module';

@NgModule({
  //Componentes
  declarations: [
    AppComponent,
    RutaLoginComponent,
    RutaForbiddenComponent,
    RutaNotFoundComponent,
    RutaInicioComponent,
    RutaUsuarioComponent,
    RutaPostComponent,
    RutaAppComponent,
    RutaBodegaComponent
  ],

  //Modulos
  imports: [
    BrowserModule,
    AppRoutingModule,
    BannerImagenesModule
  ],

  //Servicios
  providers: [
    AuthService,
    EstaLogeadoGuard,
    EsAdministradorGuard
  ],

  //Componente principal(aqui empieza todo)
  bootstrap: [AppComponent]
})
export class AppModule { }
