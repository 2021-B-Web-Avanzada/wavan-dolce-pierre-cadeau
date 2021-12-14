const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
/*let jsonPath;
if (require.main === module) {
    console.log('called directly');
    jsonPath = path.join(__dirname, 'autor.json');
} else {
    console.log('required as a module');
    //jsonPath = path.join(__dirname, '..', '..', '..', 'deber1', 'autor.json');
    jsonPath = path.join(__dirname, 'autor.json');
}*/

const fileName = 'autor.json';

function getAutors() {
    const jsonPath = path.join(__dirname, fileName);
    const data = fs.readFileSync(jsonPath);
    const autors = JSON.parse(data);
    return autors;
}

//miLibro = buscarLibro('python');
//console.log(miLibro);


async function showMenu() {
    try {
        const libro = await inquirer.prompt([
            {
                type: 'list',
                name: 'accion',
                message: 'What you want to do?',
                choices: ['Show all autors', 'Show book of an autor', 'Search a book', 'Create a new book', 'Exit'],
            },
        ]);
        if (libro.accion === 'Show all autors') {
            showAutors();
        } else if (libro.accion === 'Show book of an autor') {
            selectAutor();
        } else if (libro.accion === 'Search a book') {
            searchBook();
        } else if (libro.accion === 'Create a new book') {
            createBook();
        } else {
            process.exit();
        }
    } catch (error) {
        console.error(error);
    }
}

async function showAutorList() {
    let au = [];
    getAutors().forEach(element => {
        au.push(element.nombreCompleto);
    })
    const autor = await inquirer.prompt([
        {
            type: 'list',
            name: 'name',
            message: 'Choose an autor',
            choices: au,
        },
    ]);
    return autor;
}

async function searchBook() {
    try {
        const autor = await showAutorList();
        getBookName().then(function (titulo) {
            console.log(buscarLibrosAutor(autor.name, titulo));
        })
    } catch (error) {
        console.error(error);
    }
}

async function getBookName() {
    try {
        const libro = await inquirer.prompt([
            {
                type: 'input',
                name: 'titulo',
                message: 'Ingresa el titulo del libro'
            },
        ]);
        return libro.titulo;
    } catch (error) {
        console.error(error);
    }
}

async function selectAutor() {
    try {
        const autor = await showAutorList();
        console.log(buscarAutor(autor.name));
    } catch (error) {
        console.error(error);
    }
}

async function createBook() {
    const autor = await showAutorList();
    crearLibro(autor.name);
}


function showAutors() {
    const autors = getAutors();
    console.log(autors);
}

async function getDimension() {
    try {
        const dimension = await inquirer.prompt([
            {
                type: 'input',
                name: 'ancho',
                message: 'Ingresa el ancho del libro'
            },
            {
                type: 'input',
                name: 'alto',
                message: 'Ingresa el alto del libro'
            },
        ]);
        return dimension;
    } catch (error) {
        console.error(error);
    }
}

async function crearLibro(autor) {
    try {
        const libro = await inquirer.prompt([
            {
                type: 'input',
                name: 'titulo',
                message: 'Ingresa el titulo del libro'
            },
            {
                type: 'input',
                name: 'numeroPaginas',
                message: 'Cúantas páginas tiene el libro?'
            },
            {
                type: 'list',
                name: 'leido',
                message: 'Has leido ese libro?',
                choices: ['Yes', 'No'],
            },
            {
                type: 'input',
                name: 'precio',
                message: 'Cúanto cuesta el libro?'
            },
            {
                type: 'input',
                name: 'editorial',
                message: 'Cúal es el Editorial?'
            },
            {
                type: 'input',
                name: 'isbn',
                message: 'Ingrese el ISBN'
            },
            {
                type: 'input',
                name: 'peso',
                message: 'Ingrese el peso'
            },
            {
                type: 'input',
                name: 'idioma',
                message: 'Ingrese el idioma'
            },
            {
                type: 'input',
                name: 'fecha',
                message: 'Ingrese la fecha de publicación'
            },
        ]);
        const dimension = await getDimension();
        libro.dimension = dimension;
        saveBook(autor, libro);
    } catch (error) {
        console.error(error);
    }
}

function saveBook(nombre, libro) {
    let autors = getAutors();
    for (autor of autors) {
        if (autor['nombreCompleto'].toLowerCase().includes(nombre.toLowerCase())) {
            autor.libros.push(libro);
            break;
        }
    }
    saveAutors(autors);
}

function buscarAutor(nombre) {
    for (const iterator of getAutors()) {
        if (iterator['nombreCompleto'].toLowerCase().includes(nombre.toLowerCase())) {
            return iterator;
        }
    }
    return null;
}


function buscarLibro(autorABuscar, titulo) {
    const libros = autorABuscar.libros.filter(function (libro) {
        return libro.titulo.toLowerCase().includes(titulo.toLowerCase());
    })
    return libros;
}

function buscarLibrosAutor(autor, titulo) {
    const autorEncontrato = buscarAutor(autor);
    if (autorEncontrato != null) {
        const libros = buscarLibro(autorEncontrato, titulo);
        return libros;
    }
    return null;
}

function saveAutors(autors) {
    fs.writeFileSync(fileName, JSON.stringify(autors));
}

// Exportamos las funciones 
module.exports = {
    buscarAutor,
    buscarLibrosAutor,
    getAutors
}

showMenu();

/*
let libroa = {
    titulo: 'YABAScript',
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

saveBook('manuel', libroa);*/