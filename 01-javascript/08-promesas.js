//08-promesas.js

const fs = require('fs');

function promesaEsPar(numero) {
    const miPrimerPromesa = new Promise(/*Definicion de la promesa*/(resolve, reject) => {
        if (numero % 2 == 0) {
            resolve(numero);
        } else {
            reject(`El número ${numero} es impar`);
        }
    });
    return miPrimerPromesa;
}

function promesaElevarAlCuadrado(numero) {
    const miPrimerPromesa = new Promise(/*Definicion de la promesa*/(resolve, reject) => {
        resolve(numero * numero);
    });
    return miPrimerPromesa;
}

promesaEsPar(6)
    .then((resultado) => {
            //console.log(resultado)
            return promesaElevarAlCuadrado(resultado)
        }
    ).then(
    (cuadrado) => {
        console.log(cuadrado)
    }
).catch(
    (error) => {
        console.log(error)
    }
)
    .catch(error => console.log(error));
/*
promesaElevarAlCuadrado(5)
    .then(resultado => console.log(resultado))
    .catch(error => console.log(error));*/