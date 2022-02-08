import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HistorialCompraInterface } from '../interfaces/historial-compra.interface';



@Injectable({
    providedIn: 'any'
})
export class HistorialCompraService {

    constructor(private http: HttpClient) { }

    getCarsSmall(): Observable<HistorialCompraInterface[]> {
        /*return this.http.get('/showcase/resources/data/cars-small.json')
            .toPromise()
            .then(res => res?.data as HistorialCompraInterface[])
            .then(data => { return data; });*/
        const url = "https://raw.githubusercontent.com/primefaces/primeui/master/showcase/resources/data/cars-medium.json";
        return this.http
            .get(url)
            .pipe(
                map(
                    (respuesta: Object) => respuesta as HistorialCompraInterface[]
                )
            );
    }
}