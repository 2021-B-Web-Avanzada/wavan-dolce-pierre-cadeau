import { Injectable } from "@angular/core";
import { Socket } from "ngx-socket-io";


@Injectable({
    providedIn: "root"
})

export class PiezasService {
    constructor(private socket: Socket) { }
    
    arrayPiezas: number[] = []


}