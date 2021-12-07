// 03-Operadores.js
const arreglo = [
    {
        id: 1,
        nombre: 'Adrian',
        nota: 5
    },
    {
        id: 2,
        nombre: 'Vicente',
        nota: 8
    },
    {
        id: 3,
        nombre: 'Carolina',
        nota: 14
    },
    {
        id: 4,
        nombre: 'Wendy',
        nota: 16
    },
    {
        id: 5,
        nombre: 'Andrea',
        nota: 19
    },
    {
        id: 6,
        nombre: 'Pamela',
        nota: 19
    },
    {
        id: 7,
        nombre: 'Cristian',
        nota: 20
    },
    {
        id: 8,
        nombre: 'Daniel',
        nota: 19
    },
    {
        id: 9,
        nombre: 'Lilly',
        nota: 14
    },
    {
        id: 10,
        nombre: 'Ramiro',
        nota: 12
    },
    {
        id: 11,
        nombre: 'Pierre',
        nota: 10
    }
];


// Funciones como parametros
// Find
//Enviamos una expresion -> Truty Falsy
//devuelve el primero que cumpla esa condicion
const respuestaFind = arreglo.find(function (valorActual, indiceActual, arregloCompleto) {
    return valorActual.nombre === 'Cristian';
});

console.log('respuestaFind', respuestaFind);

//FindIndex
//Enviamos una expresion -> Truty Falsy
//devuelve el primero que cumpla esa condicion
const respuestaIndex = arreglo.findIndex(function (valorActual, indiceActual, arregloCompleto) {
    return valorActual.nombre === 'Carlos';
});

console.log('respuestaIndex', respuestaIndex);

const respuestaForEach = arreglo.forEach(function (valorActual, indiceActual, arregloCompleto) {
    console.log('valorActual', valorActual);
});

console.log('respuestaForEach', respuestaForEach);


//MAP  (Modifica el arreglo y devuelve un nuevo arreglo)
//Enviamos los datos del nuevo arreglo
//devuelve un nuevo arreglo

const respuestaMap = arreglo.map((valorActual, indiceActual, arregloCompleto) => {
    const nuevoObjeto = {
        id: valorActual.id,
        nombre: valorActual.nombre,
        nota: valorActual.nota + 1
    };

    return nuevoObjeto;
});
console.log('respuestaMap', respuestaMap);

//FILTER (filtrar el arreglo)
// enviamos EXPRESION -> Truty Falsy
// devuelve los elementos que cumplan esa condicion

const respuestaFilter = arreglo.filter((valorActual, indiceActual, arregloCompleto) => {
    return valorActual.nota >= 14;
});

console.log('respuestaFilter', respuestaFilter);

// SOME -> expresion
// Devuelve booleano
//Hay alguna nota menor a 9? SI o No
//OR
const respuestaSome = arreglo.some((valorActual, indiceActual, arregloCompleto) => {
    return valorActual.nota < 9;
});

console.log('respuestaSome', respuestaSome);

//EVERY -> expresion
// Devuelve booleano
//Todas las notas son mayores a 14? SI o No
//AND
const respuestaEvery = arreglo.every((valorActual, indiceActual, arregloCompleto) => {
    return valorActual.nota >= 14;
});

console.log('respuestaEvery', respuestaEvery);


//[1,2,3,5,6,5,4,3,1]
//REDUCE izquierda -> derecha
// REDUCE RIGHT derecha -> izquierda

//REDUCE
const respuestaReduce =
    arreglo.reduce((valorAcumulado, valorActual, indiceActual, arregloCompleto) => {
        return valorAcumulado +" - "+ valorActual.nota;
    }, "Hola");

console.log('respuestaReduce', respuestaReduce);


//REDUCE RIGHT
const respuestaReduceRight =
    arreglo.reduceRight((valorAcumulado, valorActual, indiceActual, arregloCompleto) => {
        return valorAcumulado +" - "+ valorActual.nota;
    }, "Hola");

console.log('respuestaReduceRight', respuestaReduceRight);