import { LibroInterface } from '../interfaces/libro.interface';


export interface AutorInterface {
    nombre: string;
    apellido: string;
    edad: number;
    direccion: string;
    nacionalidad: string;
    nombreCompleto: string;
    libros: LibroInterface[];
}