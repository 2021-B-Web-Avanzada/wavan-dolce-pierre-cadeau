import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HistorialCompraInterface } from '../interfaces/historial-compra.interface';
import { OrdenCompraInterface } from '../interfaces/orden-compra.interface';



@Injectable({
    providedIn: 'any'
})
export class HistorialCompraService {

    constructor(
        private readonly httpClient: HttpClient
    ) { }

    getCarsSmall(): Observable<HistorialCompraInterface[]> {
        /*return this.http.get('/showcase/resources/data/cars-small.json')
            .toPromise()
            .then(res => res?.data as HistorialCompraInterface[])
            .then(data => { return data; });*/
        const url = "https://raw.githubusercontent.com/primefaces/primeui/master/showcase/resources/data/cars-medium.json";
        return this.httpClient
            .get(url)
            .pipe(
                map(
                    (respuesta: Object) => respuesta as HistorialCompraInterface[]
                )
            );
    }

    mostrarOrdenesCompra(idUsuario: number | undefined): Observable<OrdenCompraInterface[]> {
        const url = environment.urlAPI + 'ordenes_compra/?idUsuario=' + idUsuario;
        return this.httpClient
            .get(url,)
            .pipe(
                map(
                    (resultadoEnData: Object) => resultadoEnData as OrdenCompraInterface[]
                )
            )
    }

    crearHistorialCompra(datos: OrdenCompraInterface): Observable<OrdenCompraInterface> {
        const url = `${environment.urlAPI}ordenes_compra/`;
        return this.httpClient.post(url, datos)
            .pipe(map((resultadoEnData) => resultadoEnData as OrdenCompraInterface))
    }
}