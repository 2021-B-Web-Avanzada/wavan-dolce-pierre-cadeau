import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CooperativaInterface } from '../interfaces/cooperativa.interface';
import {ViajeInterface} from "../interfaces/viaje.interface";
import {ViajeCreateInterface} from "../interfaces/viaje-create.interface";



@Injectable({
    providedIn: 'any'
})
export class CooperativasService {

  constructor(
    private readonly httpClient: HttpClient
  ) {
  }

  mostrarCooperativas(){
    const url = environment.urlAPI+'cooperativas/';
    return this.httpClient
      .get(url, )
      .pipe(
        map(
          (resultadoEnData: Object) => resultadoEnData as CooperativaInterface[]
        )
      )
  }

  buscarCooperativa(idCooperativa: number) {
    const url = environment.urlAPI+'cooperativas/' + idCooperativa +'/';
    return this.httpClient
      .get(url)
      .pipe(
        map(
          (resultadoEnData: Object) => resultadoEnData as CooperativaInterface
        )
      )
  }

  actualizarCooperativaPorId(idCooperativa: number, datosActualizar: CooperativaInterface): Observable<CooperativaInterface> {
    const url = environment.urlAPI+'cooperativas/' + idCooperativa + '/';
    return this.httpClient.put(url, datosActualizar)
      .pipe(map((resultadoEnData) => resultadoEnData as CooperativaInterface))
  }
  insertarCooperativa(datos: CooperativaInterface): Observable<CooperativaInterface> {
    const url = environment.urlAPI+'cooperativas/';
    return this.httpClient.post(url, datos)
      .pipe(map((resultadoEnData) => resultadoEnData as CooperativaInterface))
  }
  eliminarCooperativa(idCooperativa: number): Observable<CooperativaInterface> {
    const url = environment.urlAPI+'cooperativas/'+idCooperativa+ '/';
    return this.httpClient.delete(url)
      .pipe(map((resultadoEnData) => resultadoEnData as CooperativaInterface))
  }
}
