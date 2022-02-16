import { Module } from "@nestjs/common";
import { EventosGetway } from "./eventos.getway";


@Module({
    providers: [
        EventosGetway
    ],
    exports: [
        EventosGetway
    ]
})

export class EventosModule {
}