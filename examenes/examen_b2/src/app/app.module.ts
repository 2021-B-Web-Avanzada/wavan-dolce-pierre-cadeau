import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RutaDominoComponent } from './rutas/ruta-domino/ruta-domino.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { RutaInicioComponent } from './rutas/ruta-inicio/ruta-inicio.component';
import { SocketIoModule } from 'ngx-socket-io';


@NgModule({
  declarations: [
    AppComponent,
    RutaDominoComponent,
    RutaInicioComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DragDropModule,
    SocketIoModule.forRoot({
      url: 'ws://localhost:8080',
      options: {
      },
    }),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
