import { Injectable } from "@angular/core";
import { Socket } from "ngx-socket-io";


@Injectable({
    providedIn: "root"
})

export class WebsocketsService {

    constructor(private socket: Socket) { }

    ejecutarEventoEntrarASala(nombre: string, salaId: string) {
        const resp = this.socket.emit(
            'entrarASala', {
            nombre: nombre,
            salaId: salaId
        });
    }


    con() {
        this.socket.on('connect', function () {
            console.log('conectado');
        });
    }

    escucharEventoEntrarASala() {
        return this.socket
            .fromEvent('escucharEventoEntrarASala');
    }

    ejecutarEventoIniciarJuego(salaId: string, nombre: string, jugador1: any[], arrayPiezas: number[]) {
        // Emitimos un evento
        const resp = this.socket.emit(
            'iniciarJuego', {
            nombre,
            salaId,
            jugador1,
            arrayPiezas
        });
    }
    escucharEventoIniciarJuego() {
        console.log("escucharEventoIniciarJuego");
        return this.socket.fromEvent('escucharEventoIniciarJuego')
    }

    ejecutarEventoEnviarMensaje(salaId: number, nombre: string, mensaje: string) {
        // Emitimos un evento
        this.socket.emit(
            'enviarMensaje', {
            nombre,
            salaId,
            mensaje
        });
    }
    escucharEventoMensajeSala() {
        return this.socket.fromEvent('escucharEventoMensajeSala')
    }

    ejecutarEventoJugar(
        salaId: string,
        nombre: string,
        pieza: number,
        pos: number,
        jugador1: any[],
        jugador2: any[],
        mesa: any[]) {
        // Emitimos un evento
        this.socket.emit(
            'jugar', {
            nombre,
            salaId,
            pieza,
            pos,
            jugador1,
            jugador2,
            mesa
        });
    }
    escucharEventoJugar() {
        return this.socket.fromEvent('escucharEventoJugar')
    }

    ejecutarEventoPaso(salaId: string, nombre: string) {
        this.socket.emit(
            'paso', {
            nombre,
            salaId
        });
    }

    escucharEventoPaso() {
        return this.socket.fromEvent('escucharEventoPaso')
    }
}