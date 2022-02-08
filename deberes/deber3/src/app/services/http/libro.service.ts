import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AutorInterface } from '../interfaces/autor.interface';
import { environment } from 'src/environments/environment';
import { LibroInterface } from '../interfaces/libro.interface';


@Injectable({
    providedIn: 'any'
})
export class LibroService {

    constructor(private http: HttpClient) { }

    getBookFtomAutor(autor: string, libro: string): Observable<LibroInterface[]> {
        /*return this.http.get('/showcase/resources/data/cars-small.json')
            .toPromise()
            .then(res => res?.data as HistorialCompraInterface[])
            .then(data => { return data; });*/
        const url = `${environment.apiUrl}libros/${autor}&${libro}`;
        return this.http
            .get(url)
            .pipe(
                map(
                    (respuesta: Object) => respuesta as LibroInterface[]
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