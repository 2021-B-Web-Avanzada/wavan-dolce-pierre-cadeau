// 01- javascript
//              / 01-variables.js
//mutables e inmutables
//mutables
var numerouno = 1;
var numerodos = 2;

numerouno = 5;
numerodos = 8;

numerouno = false;
numerodos = true;

//inmutables
const configuracionarchivos = "pdf";

//no se puede cambiar el valor de una variable inmutable
//configuracionarchivos = "xml";

//vamos a preferir const > let > nunca var!

//tipos de variables
const numero = 1; //number
const sueldo = 1.2; //number
const texto = "pierre"; //string
const apellido = 'dolce'; //string
const booleano = false; //boolean
const hijos = null; //null
const zapatos = undefined; //undefined

console.log(typeof numero);
console.log(typeof sueldo);
console.log(typeof texto);
console.log(typeof apellido);
console.log(typeof booleano);
console.log(typeof hijos);
console.log(typeof zapatos);
console.log(typeof Number("asd")) //number
console.log(Number("asd")) //nan

//truty falsy
/*if(true) {
    console.log("es truty");
}else {
    console.log("es falsy");
}*/

//Falsy
if ("") {
    console.log("string vacio es es verdadero");
} else {
    console.log("string vacio es es falsy");
}

//Truty
if ("Pierre") {
    console.log("string con dato es truty");
} else {
    console.log("string con dato es falsy");
}

//Negativo
if (-1) {
    console.log("Negativo es truty");
} else {
    console.log("Negativo es falsy");
}

//Cero
if (0) {
    console.log("Cero es truty");
} else {
    console.log("Cero es falsy");
}

//Positivo
if (1) {
    console.log("Positivo es truty");
} else {
    console.log("Positivo es falsy");
}

//Null
if (null) {
    console.log("Null es truty");
} else {
    console.log("Null es falsy");
}

//Undefined
if (undefined) {
    console.log("Undefined es truty");
} else {
    console.log("Undefined es falsy");
}

//Objetos Js (JSON) - Arreglos
const pierre = {
    nombre: "pierre", //llave: valor
    apellido: "dolce",
    edad: 23,
    hijos: null,
    zapatos: undefined,
    casado: false,
    ropa: {
        camisa: "roja",
        pantalon: ""
    },
    direccion: {
        calle: "calle",
        numero: "1"
    },
    mascotas: ["perro", "gato"]
}

console.log(pierre);

//Acceder a las propiedades del objeto
pierre.nombre; //"pierre"
pierre.apellido; //"dolce"
pierre["nombre"]; //"pierre"
console.log(pierre);

pierre.nombre = "Peter";
console.log(pierre);
pierre["nombre"] = "Peterca";
console.log(pierre);
pierre.sueldo; //undefined
console.log(pierre.sueldo);

//Agregar nuevas propiedades al objeto
pierre.sueldo = 1.2;
pierre["gastos"] = 0.8;
console.log(pierre.gastos);
console.log(pierre);
console.log(Object.keys(pierre));
console.log(Object.values(pierre));

//Eliminar claves del objeto
delete pierre.nombre; //Eliminar la clave nombre
console.log(pierre);

//Variables por valor y por referencia
//Variables por valor en JS son las primitivas: number, string, boolean, null, undefined
let edadPierre = 23;
let edadDolce = edadPierre; //Guardamos una primitiva en otra variable
                            //variables por valor
console.log(edadPierre); //23
console.log(edadDolce); //23
edadPierre++;
console.log(edadPierre); //24
console.log(edadDolce); //23


//Variables por referencia en JS son los objetos: object, array ({}, [])
// let peter = {
//     nombre: "peter",
// }
// let peterca = peter; //Guardamos un objeto en otra variable
// //variables por referencia
// console.log(peter);
// console.log(peterca);
// peterca.nombre = "peterca";
// peterca.apellido = "dolce";
// console.log(peter);
// console.log(peterca);
// delete peterca.nombre;
// console.log(peter);
// console.log(peterca);

let peter = {
    nombre: "peter",
}
let peterca = Object.assign({}, peter);
console.log(peter);
console.log(peterca);
peterca.nombre = "peterca";
peterca.apellido = "dolce";
console.log(peter);
console.log(peterca);
delete peterca.nombre;
console.log(peter);
console.log(peterca);

let arregloNumeros = [1, 2, 3, 4, 5];
let arregloClonado = Object.assign([], arregloNumeros);
console.log(arregloNumeros);
console.log(arregloClonado);
arregloNumeros[0] = 200;
arregloClonado[0] = 100;
console.log(arregloNumeros);
console.log(arregloClonado);