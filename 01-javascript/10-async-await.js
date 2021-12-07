//10-async-await.js

function promesaLeerArchivo() {
    return new Promise((resolve, reject) => {
        resolve('Contenido leer archivo');
    });
}

function promesaEscribirArchivo() {
    return new Promise((resolve, reject) => {
        resolve('Contenido escribir archivo');
    });
}

//ASYNC AWAIT
// 1) Metodos de clases
// 2) Funcion
// ESTO NO ES POSIBLE
// PORQUE NO ESTA DENTRO DE UNA FUNCTION
// const respuesta = await promesaLeerArchivo;
// Al momento de usar la palabra ASYNC, esa función se convierte
// en una promesa

const ejemplo1 = async function () {
}
const ejemplo2 = async () => {
}

async function ejercicio() {
    console.log('1')
    let nuevoContenido = ''
    try {
        console.log('2')
        const contenidoArchivoActual = await promesaLeerArchivo();
        console.log(contenidoArchivoActual);
        console.log('3')
        await promesaEscribirArchivo();
        console.log('4')
        nuevoContenido = await promesaLeerArchivo();
        console.log(nuevoContenido);
        console.log('5')
    } catch (error) {
        console.error(error);
    }
    console.log('6')
    console.log('7')
    return nuevoContenido;
}

ejercicio().then(
    (data) => {
        console.log("Esta el la respuesta del ASYNC AWAIT", data);
    }).catch().finally()