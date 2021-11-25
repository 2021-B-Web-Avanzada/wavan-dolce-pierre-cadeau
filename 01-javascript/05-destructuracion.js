//05-destructuracion.js

const pierre = {
    nombre: 'Pierre',
    edad: 23
}

const peter = {
    nombre: 'Pi',
    apellido: 'Erre'
}

const pierreDolce = {
    ...peter,
    ...pierre
}

console.log(pierreDolce);


//Arreglos
const arregloUno = [1, 2, 3, 4, 5];
const arregloDos = [6, 7, 8, 9, 10];

const superArreglo = [...arregloUno, ...arregloDos];
console.log(superArreglo);

