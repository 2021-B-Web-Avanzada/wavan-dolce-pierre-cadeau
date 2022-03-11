import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RutaInicioSesionComponent } from './rutas/ruta-inicio-sesion/ruta-inicio-sesion.component';
import { PiePaginaComponent } from './componentes/pie-pagina/pie-pagina.component';
import { BarraNavegacionComponent } from './componentes/barra-navegacion/barra-navegacion.component';
import { RutaCreacionCuentaComponent } from './rutas/ruta-creacion-cuenta/ruta-creacion-cuenta.component';
import { RutaCompraPasajesComponent } from './rutas/ruta-compra-pasajes/ruta-compra-pasajes.component';
import { TarjetaViajeComponent } from './componentes/tarjeta-viaje/tarjeta-viaje.component';
import { RutaEscogerAsientoComponent } from './rutas/ruta-escoger-asiento/ruta-escoger-asiento.component';
import { SillaComponent } from './componentes/silla/silla.component';
import { RutaPagoAsientosComponent } from './rutas/ruta-pago-asientos/ruta-pago-asientos.component';
import { CodigoQrComponent } from './componentes/codigo-qr/codigo-qr.component';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalCodigoQrComponent } from './componentes/modal-codigo-qr/modal-codigo-qr.component';
import { RutaHistorialComprasComponent } from './rutas/ruta-historial-compras/ruta-historial-compras.component';
import { TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { RutaPerfilUsuarioComponent } from './rutas/ruta-perfil-usuario/ruta-perfil-usuario.component';
import { RutaListaViajesComponent } from './rutas/ruta-lista-viajes/ruta-lista-viajes.component';
import { RutaListaCooperativasComponent } from './rutas/ruta-lista-cooperativas/ruta-lista-cooperativas.component';
import { RutaRegistroCooperativaComponent } from './rutas/ruta-registro-cooperativa/ruta-registro-cooperativa.component';
import { RutaActualizarCooperativaComponent } from './rutas/ruta-actualizar-cooperativa/ruta-actualizar-cooperativa.component';
import { RutaRegistrarViajesComponent } from './rutas/ruta-registrar-viajes/ruta-registrar-viajes.component';
import { RutaActualizarViajeComponent } from './rutas/ruta-actualizar-viaje/ruta-actualizar-viaje.component';
import { AuthService } from './services/auth/auth.service';
import { EstaLogeadoGuard } from './services/auth/esta-logeado.guard';
import { EsAdministradorGuard } from './services/auth/es-administrador.guard';
import { EsUsuarioGuard } from './services/auth/es-usuario.guard';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { TipoUsuarioGuard } from './services/auth/tipo-usuario.guard';
import { ViajeService } from './services/http/viajes.service';
import * as cardValidator from 'card-validator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TextMaskModule } from 'angular2-text-mask';
import { PaymentInputsModule } from 'ngx-payment-inputs';
import { AsientosGuard } from './services/auth/asientos.guard';

@NgModule({
  declarations: [
    AppComponent,
    RutaInicioSesionComponent,
    PiePaginaComponent,
    BarraNavegacionComponent,
    RutaCreacionCuentaComponent,
    TarjetaViajeComponent,
    RutaEscogerAsientoComponent,
    SillaComponent,
    RutaPagoAsientosComponent,
    CodigoQrComponent,
    ModalCodigoQrComponent,
    RutaHistorialComprasComponent,
    RutaPerfilUsuarioComponent,
    RutaListaViajesComponent,
    RutaListaCooperativasComponent,
    RutaRegistroCooperativaComponent,
    RutaActualizarCooperativaComponent,
    RutaRegistrarViajesComponent,
    RutaActualizarViajeComponent,
    RutaCompraPasajesComponent,
    
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgxQRCodeModule,
        HttpClientModule,
        BrowserAnimationsModule,
        TableModule,
        MatDialogModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        TextMaskModule,
        PaymentInputsModule 
    ],
  providers: [
    AuthService,
    ViajeService,
    EstaLogeadoGuard,
    EsAdministradorGuard,
    EsUsuarioGuard,
    TipoUsuarioGuard,
    AsientosGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
