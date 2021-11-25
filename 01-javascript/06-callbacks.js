// 06-calbacks.js
//Importar una libreria de terceros
const fs = require('fs'); // File System
console.log('Primero');

//06-ejemplo.txt -> Hola

fs.readFile('01-variables.js', 'utf-8', (err, data1) => {
    if (err) {
        console.log('Error: ', err);
    } else {
        fs.readFile('06-ejemplo.txt', 'utf-8', (err, data2) => {
            if (err) {
                console.log('Error: ', err);
            } else {
                console.log('Segundo');
                console.log(data1+"\n"+data2);
            }
        });
    }
});

console.log('Tercero');

function leerArchivo(nombreArchivo, callback) {
    fs.readFile(nombreArchivo, 'utf-8', (err, data) => {
        if (err) {
            callback(err);
        } else {
            callback(null, data);
        }
    });
}

leerArchivo("06-ejemplo.txt", (err, data1) => {
    leerArchivo("01-variables.js", (err, data2) => {
        console.log(data1+"\n"+data2);
    });
});


