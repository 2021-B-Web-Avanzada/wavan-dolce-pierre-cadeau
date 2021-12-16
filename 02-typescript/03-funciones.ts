//03-funciones.ts

function sumarNumeros(numeroInicial: number, ...numerosInfinitos: number[]): number {
    return numeroInicial;
}

//sumarNumeros('asd','asd); //Otos tipos de datos no permitidos
let num: number = sumarNumeros(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
console.log(num);

function imprimir(mensaje: string): void {
    console.log('Hola ' + mensaje);
}

const arregloNumeros: number[] = [1, 2];
const arregloNumerosDos: Array<number> = [1, 2];
const arregloNumerosTres: (number | string | boolean)[] = [1, 'dos', true];
const arregloNumerosCuatro: Array<number | string | boolean> = [1, 'dos', true];
let arreglosNumerosCinco: number[] | string[] = [1, 2];
arreglosNumerosCinco = ['uno', 'dos'];