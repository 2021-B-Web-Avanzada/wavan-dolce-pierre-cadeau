import { DimensionInterface } from '../interfaces/dimension.interface';


export interface LibroInterface {
    titulo: string;
    numeroPaginas: number;
    leido: boolean;
    precio: number;
    editorial: string;
    isbn: string;
    peso: number;
    idioma: string;
    fecha: string;
    dimension: DimensionInterface
}