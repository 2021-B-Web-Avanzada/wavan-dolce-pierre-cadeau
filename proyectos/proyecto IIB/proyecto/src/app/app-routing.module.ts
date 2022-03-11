import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RutaCompraPasajesComponent } from './rutas/ruta-compra-pasajes/ruta-compra-pasajes.component';
import { RutaCreacionCuentaComponent } from './rutas/ruta-creacion-cuenta/ruta-creacion-cuenta.component';
import { RutaEscogerAsientoComponent } from './rutas/ruta-escoger-asiento/ruta-escoger-asiento.component';
import { RutaHistorialComprasComponent } from './rutas/ruta-historial-compras/ruta-historial-compras.component';
import { RutaInicioSesionComponent } from './rutas/ruta-inicio-sesion/ruta-inicio-sesion.component';
import { RutaListaCooperativasComponent } from './rutas/ruta-lista-cooperativas/ruta-lista-cooperativas.component';
import { RutaListaViajesComponent } from './rutas/ruta-lista-viajes/ruta-lista-viajes.component';
import { RutaPagoAsientosComponent } from './rutas/ruta-pago-asientos/ruta-pago-asientos.component';
import { RutaPerfilUsuarioComponent } from './rutas/ruta-perfil-usuario/ruta-perfil-usuario.component';
import { RutaRegistroCooperativaComponent } from "./rutas/ruta-registro-cooperativa/ruta-registro-cooperativa.component";
import {
  RutaActualizarCooperativaComponent
} from "./rutas/ruta-actualizar-cooperativa/ruta-actualizar-cooperativa.component";
import { RutaRegistrarViajesComponent } from "./rutas/ruta-registrar-viajes/ruta-registrar-viajes.component";
import { RutaActualizarViajeComponent } from "./rutas/ruta-actualizar-viaje/ruta-actualizar-viaje.component";
import { EsAdministradorGuard } from './services/auth/es-administrador.guard';
import { EstaLogeadoGuard } from './services/auth/esta-logeado.guard';
import { TipoUsuarioGuard } from './services/auth/tipo-usuario.guard';
import { AsientosGuard } from './services/auth/asientos.guard';

const routes: Routes = [
  {
    path: 'inicioSesion',
    component: RutaInicioSesionComponent,
  },
  {
    path: 'actualizarCooperativa/:idCooperativa',
    component: RutaActualizarCooperativaComponent,
  },
  {
    path: 'registrarViaje',
    component: RutaRegistrarViajesComponent,
  },
  {
    path: 'actualizarViaje/:idViaje',
    component: RutaActualizarViajeComponent,
  },
  {
    path: 'crearCuenta',
    component: RutaCreacionCuentaComponent,
  },
  {
    path: 'comprarPasajes',
    canActivate: [EstaLogeadoGuard],
    component: RutaCompraPasajesComponent,
  },
  {
    path: 'escogerAsiento/:idViaje',
    component: RutaEscogerAsientoComponent,
  },
  {
    path: 'pagarAsiento/:idViaje',
    canActivate: [AsientosGuard],
    component: RutaPagoAsientosComponent,
  },
  {
    path: 'historialCompras',
    component: RutaHistorialComprasComponent,
  },
  {
    path: 'registroCooperativa',
    component: RutaRegistroCooperativaComponent,
  },
  {
    path: 'perfilUsuario',
    component: RutaPerfilUsuarioComponent,
  },
  {
    path: 'listarViajes',
    canActivate: [EstaLogeadoGuard, EsAdministradorGuard],
    component: RutaListaViajesComponent,
  },
  {
    path: 'listarCooperativas',
    //canActivate: [EsAdministradorGuard],
    component: RutaListaCooperativasComponent,
  },
  {
    path: '',
    component: RutaInicioSesionComponent,
  },
  {
    path: 'login',
    component: RutaInicioSesionComponent,
  },
  //ruta forbiden
  {
    path: 'forbidden',
    component: RutaRegistroCooperativaComponent,
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
