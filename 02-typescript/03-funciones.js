//03-funciones.ts
function sumarNumeros(numeroInicial) {
    var numerosInfinitos = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        numerosInfinitos[_i - 1] = arguments[_i];
    }
    return numeroInicial;
}
//sumarNumeros('asd','asd); //Otos tipos de datos no permitidos
var num = sumarNumeros(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
console.log(num);
function imprimir(mensaje) {
    console.log('Hola ' + mensaje);
}
var arregloNumeros = [1, 2];
var arregloNumerosDos = [1, 2];
var arregloNumerosTres = [1, 'dos', true];
var arregloNumerosCuatro = [1, 'dos', true];
var arreglosNumerosCinco = [1, 2];
arreglosNumerosCinco = ['uno', 'dos'];
