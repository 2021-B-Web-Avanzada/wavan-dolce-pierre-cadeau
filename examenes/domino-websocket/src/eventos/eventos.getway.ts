import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";
import { Socket } from 'socket.io';


@WebSocketGateway(
    8080,
    {
        cors: {
            origin: '*',
        },
    }
)

export class EventosGetway {
    @SubscribeMessage('entrarASala')
    devolverEntrarASala(
        @MessageBody() message: {
            nombre: string,
            salaId: string
        },
        @ConnectedSocket() socket: Socket) {
        socket.join(message.salaId);
        socket.broadcast.emit('escucharEventoEntrarASala',
            {
                nombre: message.nombre,
                salaId: message.salaId
            });
        return 'ok'
    }

    @SubscribeMessage('iniciarJuego')
    iniciarJuego(
        @MessageBody() message: {
            salaId: string,
            nombre: string,
            jugador1: any[],
            arrayPiezas: number[]
        },
        @ConnectedSocket() socket: Socket) {
        socket.join(message.salaId);
        const mensajeEnviar: any = {
            mensaje: 'Bienvenido ' + message.nombre,
            nombre: message.nombre,
            jugador: message.jugador1,
            piezas: message.arrayPiezas
        };
        socket.broadcast.to(message.salaId).emit('escucharEventoIniciarJuego', mensajeEnviar);
        return 'ok'
    }

    @SubscribeMessage('jugar')
    jugar(
        @MessageBody() message: {
            salaId: string,
            nombre: string,
            pieza: number,
            pos: number,
            jugador1: any[],
            jugador2: any[],
            mesa: any[],
        },
        @ConnectedSocket() socket: Socket) {
        socket.join(message.salaId);
        const nuevoMensaje = {
            salaId: message.salaId,
            nombre: message.nombre,
            pieza: message.pieza,
            pos: message.pos,
            jugador1: message.jugador1,
            jugador2: message.jugador2,
            mesa: message.mesa
        };
        socket.broadcast.to(message.salaId).emit('escucharEventoJugar', nuevoMensaje);
        return 'ok'
    }

    @SubscribeMessage('paso')
    paso(
        @MessageBody() message: {
            salaId: string,
            nombre: string
        },
        @ConnectedSocket() socket: Socket) {
        socket.join(message.salaId);
        const nuevoMensaje = {
            salaId: message.salaId,
            nombre: message.nombre,
            message: 'El jugador ' + message.nombre + ' ha pasado'
        };
        socket.broadcast.to(message.salaId).emit('escucharEventoPaso', nuevoMensaje);
        return 'ok'
    }
}