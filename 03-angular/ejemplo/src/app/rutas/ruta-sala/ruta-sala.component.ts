import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { WebsocketsService } from 'src/app/servicios/websockets/websockets.service';

@Component({
  selector: 'app-ruta-sala',
  templateUrl: './ruta-sala.component.html',
  styleUrls: ['./ruta-sala.component.scss']
})
export class RutaSalaComponent implements OnInit {
  nombre = '';
  salaId = '';
  arregloSuscripciones: Subscription[] = [];
  mensaje = '';
  arregloMensajes: {
    salaId: number;
    nombre: string;
    mensaje: string;
    posicion: 'izq' | 'der';
  }[] = [];
  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly websocketsService: WebsocketsService
  ) {
    console.log('Constructor')
  }

  ngOnInit(): void {
    console.log('ngOnInit')
    this.activatedRoute.params.subscribe({
      next: (parametrosDeRuta) => {
        const salaId = parametrosDeRuta['salaId'];
        const nombre = parametrosDeRuta['nombre'];
        this.salaId = salaId;
        this.nombre = nombre;

        this.logicaSalas(this.salaId, this.nombre)
      }
    })
  }


  enviarMensaje() {
    this.arregloMensajes.push({
      mensaje: this.mensaje,
      salaId: +this.salaId,
      nombre: this.nombre,
      posicion: 'izq'
    })
    this.websocketsService.ejecutarEventoEnviarMensaje(
      +this.salaId, this.nombre, this.mensaje
    );
    this.mensaje = '';
  }


  logicaSalas(salaId: string, nombre: string) {
    //console.log('logicaSalas', salaId, nombre)
    const respEscucharEventoMensajeSala =
      this.websocketsService.escucharEventoMensajeSala().subscribe({
        next: (data: any) => {
          console.log('Enviaron Mensaje', data);
          this.arregloMensajes.push({
            mensaje: data.mensaje,
            salaId: data.salaId,
            nombre: data.nombre,
            posicion: data.nombre === this.nombre ? 'izq' : 'der'
          })
        },
        error: (error) => {
          console.log({ error });
        }
      });

    const respEscucharEventoUnirseSala =
      this.websocketsService.escucharEventoUnirseSala()
        .subscribe({
          next: (data) => {
            console.log('Alguien entró', data);
          },
          error: (error) => {
            console.log({ error });
          }
        });

    this.arregloSuscripciones.push(
      respEscucharEventoUnirseSala
    );
    this.arregloSuscripciones.push(
      respEscucharEventoMensajeSala
    );
    this.websocketsService.ejecutarEventoUnirseSala(+this.salaId, this.nombre);
  }

  desSuscribirse() {
    this.arregloSuscripciones.forEach(
      (suscripcion) => {
        suscripcion.unsubscribe();
      }
    );
    this.arregloSuscripciones = [];
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy')
  }

}
