//09-ejercicio-lec-esc-promesas.js
const fs = require('fs');

/*
* Hacer una función que me acepte como parametro una variable
* con el path del archivo y el contenido a agregar al contenido
* del archivo. La funcion debe tomar estos dos parametros y leer
* el archivo y añadir el texto al final del archivo. Al final vamos
* a leer el archivo nuevamente e imprimirlo por consola.
* TODOO esto debe ser realizado con promesas.
* -Promesa de lectura
* -Promesa de escritura
*
* */

function promesaLeerArchivo(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf-8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

function promesaEscribirArchivo(path, data, newData) {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, data + "\n" + newData, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

function ejercicio(path, newData) {
    promesaLeerArchivo(path)
        .then(data => promesaEscribirArchivo(path, data, newData))
        .then(() => promesaLeerArchivo(path))
        .then(dataCompleto => console.log(dataCompleto))
        .catch(err => console.log(err));
}

ejercicio('./09-ejemplo.txt', 'Hola buenos días');