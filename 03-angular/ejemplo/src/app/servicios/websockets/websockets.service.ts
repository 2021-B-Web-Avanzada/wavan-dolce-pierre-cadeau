import { Injectable } from "@angular/core";
import { Socket } from "ngx-socket-io";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})

export class WebsocketsService {
    constructor(private socket: Socket) { }

    ejecutarEventoHola() {
        // Emitimos un evento
        const resp = this.socket.emit(
            'hola', {
            nombre: 'Pierre'
        });
        console.log(resp);
    }

    escucharEventoHola() {
        return this.socket
            .fromEvent('escucharEventoHola');
    }

    ejecutarEventoUnirseSala(salaId: number, nombre: string) {
        // Emitimos un evento
        this.socket.emit(
            'unirseSala', {
            nombre,
            salaId
        });
    }
    escucharEventoUnirseSala() {
        return this.socket.fromEvent('escucharEventoUnirseSala')
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
}