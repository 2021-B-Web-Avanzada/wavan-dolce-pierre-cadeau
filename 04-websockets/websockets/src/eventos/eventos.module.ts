import { Module } from "@nestjs/common";
import { EventosGetway } from "./eventos.getway";


@Module({
    providers:[
        EventosGetway
    ],
})

export class EventosModule {
}