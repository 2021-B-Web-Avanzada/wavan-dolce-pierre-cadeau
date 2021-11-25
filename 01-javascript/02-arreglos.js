// 02-arreglos.js
let arreglo = [6, 7, 8, 9, 10];
arreglo = 1;
arreglo = true;
arreglo = undefined;
arreglo = null;
arreglo = {};
arreglo = [true, 1, 1.1, "Pierre", 'Dolce', undefined, null, {}, [1, 2]];
arreglo = [6, 7, 8, 9, 10];

//for of
for (let numero of arreglo) {
    console.log("numero", numero);
}
//for in
for (let indice in arreglo) {
    arreglo[indice];
    console.log("indice", indice);
}
let objetoPrueba = {a: 1, b: 2, c: 3};
for (let llave in objetoPrueba) {
    console.log("llave", llave);
}

arreglo.push(11); //Añadir al final un elemento
// [6, 7, 8, 9, 10, 11]
console.log(arreglo);
arreglo.pop(); //Eliminar el ultimo elemento
// [6, 7, 8, 9, 10]
console.log(arreglo);
arreglo.unshift(0); //Añadir al inicio un elemento
// [0, 6, 7, 8, 9, 10]
console.log(arreglo);


arreglo.splice(0, 0, 4); //Eliminar elementos de un rango
//splice(indice, numero de elementos eliminados, elemento a añadir)
console.log(arreglo);
const indiceNueve = arreglo.indexOf(10); //Encuentra el primer elemento y deveuelve el indice
arreglo.splice(indiceNueve, 2)
console.log(arreglo);


/*arreglo.shift(); //Eliminar el primer elemento
// [6, 7, 8, 9, 10]
console.log(arreglo);
arreglo[6] = 50
console.log(arreglo[5]); //Tamaño del arreglo
console.log(arreglo); //Tamaño del arreglo*/