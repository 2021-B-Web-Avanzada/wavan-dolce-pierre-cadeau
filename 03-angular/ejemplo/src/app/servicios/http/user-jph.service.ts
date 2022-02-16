import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserJphCreateInterface } from './interfaces/user-jph-create.interface';
import { UserJphInterface } from './interfaces/user-jph.interface';

@Injectable({
  providedIn: 'any'
})
export class UserJPHService {
  constructor(private readonly httpClient: HttpClient) {
  }

  buscarTodos(parametrosConsulta?: any): Observable<UserJphInterface[]> {
    const url = `${environment.urlJPC}/users`;
    Object
      .keys(parametrosConsulta)
      .forEach(k => {
        if (!parametrosConsulta[k]) {
          delete parametrosConsulta[k];
        }
      });
    return this.httpClient
      .get(url, { params: parametrosConsulta })
      .pipe(
        map(
          (respuesta: Object) => respuesta as UserJphInterface[]
        )
      );
  }

  buscarUno(idUsuario: number): Observable<UserJphInterface> {
    const url = `${environment.urlJPC}/users/${idUsuario}`;
    return this.httpClient
      .get(url)
      .pipe(
        map(
          (respuesta: Object) => respuesta as UserJphInterface
        )
      );
  }

  actualizarPorID(idUsuario: number, usuario: UserJphCreateInterface): Observable<UserJphInterface> {
    const url = `${environment.urlJPC}/users/${idUsuario}`;
    return this.httpClient
      .put(url, usuario)
      .pipe(
        map(
          (respuesta: Object) => respuesta as UserJphInterface
        )
      );
  }
}
