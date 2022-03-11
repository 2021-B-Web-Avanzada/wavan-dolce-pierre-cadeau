import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ViajeInterface } from "../interfaces/viaje.interface";
import { HistorialCompraInterface } from '../interfaces/historial-compra.interface';
import { ViajeCreateInterface } from "../interfaces/viaje-create.interface";
import { environment } from "../../../environments/environment";
import { AsientoCompraInterface } from '../interfaces/asiento-compra.interface';



@Injectable({
  providedIn: 'any'
})
export class ViajeService {

  constructor(
    private readonly httpClient: HttpClient
  ) {
  }

  mostrarViajes() {
    const url = environment.urlAPI + 'viajes/';
    return this.httpClient
      .get(url,)
      .pipe(
        map(
          (resultadoEnData: Object) => resultadoEnData as ViajeInterface[]
        )
      )
  }

  obtenerFechaHora() {
    let fecha = new Date();
    let dia: number | string = fecha.getDate();
    let mes: number | string = fecha.getMonth() + 1;
    let anio = fecha.getFullYear();
    let hora: number | string = fecha.getHours();
    let minutos: number | string = fecha.getMinutes();
    let segundos: number | string = fecha.getSeconds();
    if (dia < 10) {
      dia = '0' + dia;
    }
    if (mes < 10) {
      mes = '0' + mes;
    }
    if (hora < 10) {
      hora = '0' + hora;
    }
    if (minutos < 10) {
      minutos = '0' + minutos;
    }
    if (segundos < 10) {
      segundos = '0' + segundos;
    }
    return '?fecha=' + anio + '-' + mes + '-' + dia + '&hora=' + hora + ':' + minutos + ':' + segundos;
  }

  mostrarViajesVigentes() {
    const url = environment.urlAPI + 'viajes/' + this.obtenerFechaHora();
    return this.httpClient
      .get(url,)
      .pipe(
        map(
          (resultadoEnData: Object) => resultadoEnData as ViajeInterface[]
        )
      )
  }

  obtenerAsientosViaje(idViaje: number): Observable<AsientoCompraInterface[]> {
    const url = environment.urlAPI + 'asientos_compra/?idViaje=' + idViaje;
    return this.httpClient.get(url)
      .pipe(map((resultadoEnData) => resultadoEnData as AsientoCompraInterface[]))
  }

  buscarViaje(idViaje: number) {
    const url = environment.urlAPI + 'viajes/' + idViaje + "/";
    return this.httpClient
      .get(url)
      .pipe(
        map(
          (resultadoEnData: Object) => resultadoEnData as ViajeInterface
        )
      )
  }

  actualizarViajePorId(idViaje: number, datosActualizar: ViajeCreateInterface): Observable<ViajeCreateInterface> {
    const url = environment.urlAPI + 'viajes/' + idViaje + "/";
    return this.httpClient.put(url, datosActualizar)
      .pipe(map((resultadoEnData) => resultadoEnData as ViajeInterface))
  }
  insertarViaje(datos: ViajeCreateInterface): Observable<ViajeInterface> {
    const url = environment.urlAPI + 'viajes/';
    return this.httpClient.post(url, datos)
      .pipe(map((resultadoEnData) => resultadoEnData as ViajeInterface))
  }
  eliminarViaje(idViaje: number): Observable<ViajeInterface> {
    const url = environment.urlAPI + 'viajes/' + idViaje;
    return this.httpClient.delete(url)
      .pipe(map((resultadoEnData) => resultadoEnData as ViajeInterface))
  }
}
