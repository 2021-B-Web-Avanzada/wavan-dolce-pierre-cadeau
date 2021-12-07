//07-lectura-escritura.js

const fs = require('fs');

/*
* Hacer una funcion que me accepte como parametro una variable
* con el path del archivo y el contenido a agregar al contenido
* del archivo. La funcion debe tomar dos parametros y leer el
* archivo y agregar el contenido al final del archivo.
* */


function escribirArchivo(path, contenido) {
    fs.readFile(path, 'utf-8', (err, contenidoArchivo) => {
        if (err) {
            console.log(err);
        } else {
            fs.writeFile(path, contenidoArchivo + '\n' + contenido, (err1) => {
                if (err1) {
                    console.log(err1);
                } else {
                    console.log('Contenido agregado');
                }
            });
        }
    });
}

escribirArchivo('./07-lectura-escritura.txt', 'Buenas tardes');
