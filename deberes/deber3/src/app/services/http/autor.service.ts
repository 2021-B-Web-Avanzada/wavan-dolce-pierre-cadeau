import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AutorInterface } from '../interfaces/autor.interface';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'any'
})
export class AutorService {

    constructor(private http: HttpClient) { }

    getAllAutors(): Observable<AutorInterface[]> {
        /*return this.http.get('/showcase/resources/data/cars-small.json')
            .toPromise()
            .then(res => res?.data as HistorialCompraInterface[])
            .then(data => { return data; });*/
        const url = `${environment.apiUrl}autors`;
        return this.http
            .get(url)
            .pipe(
                map(
                    (respuesta: Object) => respuesta as AutorInterface[]
                )
            );
    }

    getAAutor(nombre: string): Observable<AutorInterface> {
        /*return this.http.get('/showcase/resources/data/cars-small.json')
            .toPromise()
            .then(res => res?.data as HistorialCompraInterface[])
            .then(data => { return data; });*/
        const url = `${environment.apiUrl}autor/${nombre}`;
        return this.http
            .get(url)
            .pipe(
                map(
                    (respuesta: Object) => respuesta as AutorInterface
                )
            );
    }
}