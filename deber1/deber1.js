

let libro1 = {
    titulo: 'Desarrollo de motores de búsqueda utilizando herramientas open source',
    numeroPaginas: 330,
    leido: true,
    precio: 34.80,
    editorial: 'Marcombo',
    isbn: '978-84-267-3311-5',
    peso: 650.00,
    idioma: 'Castellano',
    fecha: '20-05-2021',
    dimension: {
        ancho: 240,
        alto: 170,
    }
}

let libro2 = {
    titulo: 'Hacking ético con herramientas Python',
    numeroPaginas: 290,
    leido: false,
    precio: 24.90,
    editorial: 'RA-MA S.A. Editorial y Publicaciones',
    isbn: '978-84-9964-731-9',
    peso: undefined,
    idioma: 'Castellano',
    fecha: '08-05-2018',
    dimension: {
        ancho: 240,
        alto: 170,
    }
}

let libro3 = {
    titulo: 'Desarrollo seguro en ingeniería del software. Aplicaciones seguras con Android, NodeJS, Python y C++',
    numeroPaginas: 388,
    leido: true,
    precio: 33.80,
    editorial: 'Marcombo',
    isbn: '978-84-267-2800-5',
    peso: 650.00,
    idioma: 'Castellano',
    fecha: '06-02-2020',
    dimension: {
        ancho: 240,
        alto: 170,
    }
}

let libro4 = {
    titulo: 'Seguridad en aplicaciones Web Java',
    numeroPaginas: 430,
    leido: true,
    precio: 24.90,
    editorial: 'RA-MA S.A. Editorial y Publicaciones',
    isbn: '978-84-9964-732-6',
    peso: undefined,
    idioma: 'Castellano',
    fecha: '20-03-2018',
    dimension: {
        ancho: 240,
        alto: 170,
    }
}

let libro5 = {
    titulo: 'Ciberseguridad. Manual práctico',
    numeroPaginas: 346,
    leido: true,
    precio: 27.50,
    editorial: 'Ediciones Paraninfo, S.A',
    isbn: '978-84-1366-116-2',
    peso: 720.00,
    idioma: 'Castellano',
    fecha: '15-11-2021',
    dimension: {
        ancho: 240,
        alto: 170,
    }
}

let autor = {
    nombre: 'José Manuel',
    apellido: 'Ortega Candel',
    nombreCompleto: 'José Manuel Ortega Candel',
    edad: 20,
    libros: [libro1, libro2, libro3, libro4, libro5],
}

let autor2 = {
    nombre: 'Pierre Cadeau',
    apellido: 'Dolce',
    nombreCompleto: 'Pierre Cadeau Dolce',
    edad: 23,
    libros: [libro1, libro3, libro5],
}

let autors = [autor, autor2];

//console.log(autor.libros);

const fs = require('fs');
fs.writeFileSync('autor.json', JSON.stringify([autor,autor2]));
