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

    getBooksFtomAutor(autor: string, libro: string): Observable<LibroInterface[]> {
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
        const url = `${environment.apiUrl}autor/${nombre}`;
        return this.http
            .get(url)
            .pipe(
                map(
                    (respuesta: Object) => respuesta as AutorInterface
                )
            );
    }

    postLibro(nombre: string, libro: LibroInterface): any {
        const url = `${environment.apiUrl}libros/`;
        let l = JSON.stringify(libro);
        let params = JSON.parse(l);
        params['nombre'] = nombre;
        return this.http
            .post(url, params)
            .pipe(
                map(
                    (respuesta: Object) => respuesta
                )
            );
    }

    updateLibro(nombre: string, libro: LibroInterface): any {
        const url = `${environment.apiUrl}libros/`;
        let l = JSON.stringify(libro);
        let params = JSON.parse(l);
        params['nombre'] = nombre;
        return this.http
            .put(url, params)
            .pipe(
                map(
                    (respuesta: Object) => respuesta
                )
            );
    }

    deleteLibro(nombre: string, titulo: string): any {
        const url = `${environment.apiUrl}libros/${nombre}&${titulo}`;
        return this.http
            .delete(url)
            .pipe(
                map(
                    (respuesta: Object) => respuesta
                )
            );
    }
}