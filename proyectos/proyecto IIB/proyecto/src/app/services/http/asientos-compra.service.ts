import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ViajeInterface } from "../interfaces/viaje.interface";
import { ViajeCreateInterface } from "../interfaces/viaje-create.interface";
import { environment } from "../../../environments/environment";
import { AsientoCompraInterface } from '../interfaces/asiento-compra.interface';



@Injectable({
  providedIn: 'any'
})
export class AsientosCompraService {

  constructor(
    private readonly httpClient: HttpClient
  ) {
  }

  mostrarViajes() {
    const url = environment.urlAPI + 'asientos_compra/';
    return this.httpClient
      .get(url,)
      .pipe(
        map(
          (resultadoEnData: Object) => resultadoEnData as ViajeInterface[]
        )
      )
  }

  buscarViaje(idViaje: number) {
    const url = environment.urlAPI + 'asientos_compra/' + idViaje + "/";
    return this.httpClient
      .get(url)
      .pipe(
        map(
          (resultadoEnData: Object) => resultadoEnData as ViajeInterface
        )
      )
  }

  


  insertarAsientoCompra(datos: AsientoCompraInterface): Observable<AsientoCompraInterface> {
    const url = environment.urlAPI + 'asientos_compra/';
    return this.httpClient.post(url, datos)
      .pipe(map((resultadoEnData) => resultadoEnData as AsientoCompraInterface))
  }
  eliminarViaje(idViaje: number): Observable<ViajeInterface> {
    const url = environment.urlAPI + 'viajes/' + idViaje;
    return this.httpClient.delete(url)
      .pipe(map((resultadoEnData) => resultadoEnData as ViajeInterface))
  }
}
