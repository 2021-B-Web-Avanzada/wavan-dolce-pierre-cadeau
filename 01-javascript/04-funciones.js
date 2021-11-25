// 04-funciones.js

function soloNumeros(a, b, c) {
    return a - b - c; // valor a devolver
}

soloNumeros(10, 5, 2);

function soloLetras(a, b, c) { //undefined
    console.log(a, b, c);
}


//Funciones nombradas - named functions

function funcionNombrada() {
    console.log("Función nombrada");
}

funcionNombrada();

//Funciones anonimas - anonymous functions
const funcionSinNombre = function () {
    console.log("Funcion sin nombre");
}

funcionSinNombre();

//Funciones anonimas - Fat Arrow functions
const funcionSinNombreFatArrow1 = () => {
    console.log("Funcion sin nombre Fat Arrow 1");
}

var funcionSinNombreFatArrow2 = () => {
    console.log("Funcion sin nombre Fat Arrow 2");
}

let funcionSinNombreFatArrow3 = () => {
    console.log("Funcion sin nombre Fat Arrow 3");
}
funcionSinNombreFatArrow1();


const funcionFatArrow4 = (a, b) => {
    return a + b;
}
const funcionFatArrow5 = (a, b) => a + b; //Una sola linea, omito el return, omito llaves

const funcionFatArrow6 = x => x * x; //si se tiene un solo parametro, se puede omitir los parentesis

const funcionFatArrow7 = (x, y, z) => x + y + z; //si se tiene mas de un parametro, se puede omitir los parentesis


//Funciones para recibir parametros infinitos
function sumaNumeros(...numeros) {//Parametros infinitos [2,3,4,] solo se puede tener uno en una funcion
    let suma = 0;
    for (let i = 0; i < numeros.length; i++) {
        suma += numeros[i];
    }
    return suma;
}
const suma = sumaNumeros(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
console.log(suma);

const suma2 = sumaNumeros([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
console.log(suma2);