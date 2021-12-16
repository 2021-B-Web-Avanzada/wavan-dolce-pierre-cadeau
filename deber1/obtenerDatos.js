const path = require('path');
const inquirer = require('inquirer');
const fileName = 'autor.json';
const fs = require('fs');

const jsonPath = path.join(__dirname, fileName);

//para mantener el formato al imprimir objetos
require('util').inspect.defaultOptions.depth = null

function getAutors() {
    const data = fs.readFileSync(jsonPath);
    const autors = JSON.parse(data);
    return autors;
}

async function showMenuPrincipal() {
    try {
        const menu = await inquirer.prompt([
            {
                type: 'list',
                name: 'accion',
                message: 'Choose an option',
                choices: ['Autor', 'Book', 'Exit'],
                default: 'Show all autors',
            },
        ]);

        if (menu.accion === 'Autor') {
            showMenuAutor();
        } else if (menu.accion === 'Book') {
            showMenuBook();
        }
    } catch (error) { }
}

async function showMenuAutor() {
    try {
        const autor = await inquirer.prompt([
            {
                type: 'list',
                name: 'accion',
                message: 'What you want to do?',
                choices: ['Show all autors', 'Add autor', 'Search autor', 'Edit autor', 'Delete autor', 'Back'],
                default: 'Show all autors',
            },
        ]);
        if (autor.accion === 'Show all autors') {
            showAutors();
        } else if (autor.accion === 'Add autor') {
            creatAutor();
        } else if (autor.accion === 'Search autor') {
            searchAutor();
        } else if (autor.accion === 'Edit autor') {
            editAutor();
        } else if (autor.accion === 'Delete autor') {
            deleteAutor();
        } else {
            showMenuPrincipal();
        }
    } catch (error) {
        console.error(error);
    }
}

async function showMenuBook() {
    try {
        const libro = await inquirer.prompt([
            {
                type: 'list',
                name: 'accion',
                message: 'What you want to do?',
                choices: ['Show book of an autor', 'Add book to autor', 'Search a book by autor', 'Edit book', 'Delete book', 'Back'],
                default: 'Show all autors',
            },
        ]);
        if (libro.accion === 'Show book of an autor') {
            showBookAutor();
        } else if (libro.accion === 'Add book to autor') {
            addBookToAutor();
        } else if (libro.accion === 'Search a book by autor') {
            searchBook();
        } else if (libro.accion === 'Edit book') {
            editBook();
        } else if (libro.accion === 'Delete book') {
            deleteBook();
        } else {
            showMenuPrincipal();
        }
    } catch (error) {
        console.error(error);
    }
}

async function editAutor() {
    try {
        const autor = await showAutorList();
        await editAutorData(autor.name);
    } catch (error) {
        console.error(error);
    }
    showMenuAutor();
}

async function editBook() {
    try {
        const autor = await showAutorList();
        await editAutorBooksData(autor.name);
    } catch (error) {
        console.error(error);
    }
    showMenuBook();
}

async function editAutorData(name) {
    const autors = getAutors();
    for (autor of autors) {
        if (autor['nombreCompleto'].toLowerCase().includes(name.toLowerCase())) {
            await showAutorToEdit(autor);
            break;
        }
    }
}

async function showAutorToEdit(autor) {
    try {
        const newAutor = await inquirer.prompt([
            {
                type: 'input',
                name: 'direccion',
                message: 'Enter the new direction',
                default: autor.direccion,
            },
            {
                type: 'input',
                name: 'nacionalidad',
                message: 'Enter the autor nationality',
                default: autor.nacionalidad,
            },
        ]);

        const autorCompleto = {
            ...autor,
            ...newAutor
        }
        saveAutorEdited(autorCompleto);
        console.log("Autor updated successfully");
    } catch (error) {
        console.error(error);
    }
}

async function editAutorBooksData(name) {
    const autorEncontrato = buscarAutor(name);
    const libros = autorEncontrato.libros;
    const bookTitle = await showBookList(name);
    for (libro of libros) {
        if (libro['titulo'].toLowerCase().includes(bookTitle.toLowerCase())) {
            await showBookToEdit(name, libro);
            break;
        }
    }
}

async function showBookToEdit(autorName, libro) {
    try {
        const newBook = await inquirer.prompt([
            {
                type: 'confirm',
                name: 'leido',
                message: 'Has leido el libro?',
                choices: ['Sí', 'No'],
                default: libro.leido,
            },
            {
                type: 'number',
                name: 'precio',
                message: 'Ingrese el nuevo precio',
                default: libro.precio,
            },
        ]);
        const libroCompleto = {
            ...libro,
            ...newBook
        }
        saveAutorBookEdited(autorName, libroCompleto);
        console.log("Book updated successfully");
    } catch (error) {
        console.error(error);
    }
}


async function searchAutor() {
    try {
        const autor = await inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Type the autor name',
                default: 'Manuel',
            },
        ]);
        const autorEncontrato = buscarAutor(autor.name);
        if (autorEncontrato != null) {
            console.log(autorEncontrato);
        } else {
            console.log('Autor not found');
        }
        showMenuAutor();
    } catch (error) {
        console.error(error);
    }
}

async function deleteAutor() {
    try {
        const autor = await showAutorList();
        deleteDataAutor(autor.name);
    } catch (error) {
        console.error(error);
    }
    showMenuAutor();
}

function deleteDataAutor(nombre) {
    let autors = getAutors();
    for (autor of autors) {
        if (autor['nombreCompleto'].toLowerCase().includes(nombre.toLowerCase())) {
            autors.splice(autors.indexOf(autor), 1);
            break;
        }
    }
    saveData(autors);
}

async function deleteBook() {
    try {
        const autor = await showAutorList();
        const bookTitle = await showBookList(autor.name);
        deleteBookAutor(autor.name, bookTitle);
    } catch (error) {
        console.error(error);
    }
    showMenuBook();
}

function deleteBookAutor(nombre, titulo) {
    let autors = getAutors();
    for (autor of autors) {
        if (autor['nombreCompleto'].toLowerCase().includes(nombre.toLowerCase())) {
            for (libro of autor.libros) {
                if (libro.titulo.toLowerCase().includes(titulo.toLowerCase())) {
                    autor.libros.splice(autor.libros.indexOf(libro), 1);
                    break;
                }
            }
        }
    }
    saveData(autors);
}

async function addBookToAutor() {
    try {
        const autor = await showAutorList();
        await crearLibro(autor.name);
    } catch (error) {
        console.error(error);
    }
    showMenuBook();
}

async function creatAutor() {
    const autor = await addAutor();
    const addBook = await wantToAddBook();
    if (addBook.addBook === 'Yes') {
        crearLibro(autor.nombreCompleto);
    } else {
        autor.libros = [];
        saveAutor(autor);
    }
    showMenuAutor();
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

async function showBooksAutorList(autor) {
    let li = [];
    autor.libros.forEach(element => {
        li.push(element.titulo);
    })
    const book = await inquirer.prompt([
        {
            type: 'list',
            name: 'title',
            message: 'Choose a book',
            choices: li,
        },
    ]);
    return book.title;
}

async function showBookList(name) {
    let books = [];
    buscarAutor(name).libros.forEach(element => {
        books.push(element.titulo);
    })
    const book = await inquirer.prompt([
        {
            type: 'list',
            name: 'titulo',
            message: 'Choose a book',
            choices: books,
        },
    ]);
    return book.titulo;
}

async function searchBook() {
    try {
        const autor = await showAutorList();
        getBookName().then(function (titulo) {
            console.log(buscarLibrosAutor(autor.name, titulo));
            showMenuBook();
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

async function showBookAutor() {
    try {
        const autor = await showAutorList();
        console.log(buscarAutor(autor.name));
    } catch (error) {
        console.error(error);
    }
    showMenuBook();
}




function showAutors() {
    const autors = getAutors();
    console.log(autors);
    showMenuAutor();
}

async function getDimension() {
    try {
        const dimension = await inquirer.prompt([
            {
                type: 'input',
                name: 'ancho',
                message: 'Ingresa el ancho del libro',
                default: '240',
            },
            {
                type: 'input',
                name: 'alto',
                message: 'Ingresa el alto del libro',
                default: '170',
            },
        ]);
        return dimension;
    } catch (error) {
        console.error(error);
    }
}

async function addAutor() {
    try {
        const autor = await inquirer.prompt([
            {
                type: 'input',
                name: 'nombre',
                message: 'Ingresa el nombre del autor'
            },
            {
                type: 'input',
                name: 'apellido',
                message: 'Ingresa el apellido del autor'
            },
            {
                type: 'number',
                name: 'edad',
                message: 'Ingresa la edad del autor'
            },
            {
                type: 'input',
                name: 'direccion',
                message: 'Ingresa la dirección del autor'
            },
            {
                type: 'input',
                name: 'nacionalidad',
                message: 'Ingresa la nacionalidad del autor'
            },
        ]);
        autor.nombreCompleto = autor.nombre + ' ' + autor.apellido;
        return autor;
    } catch (error) {
        console.error(error);
    }
}


async function wantToAddBook() {
    try {
        const wantoTo = await inquirer.prompt([
            {
                type: 'list',
                name: 'addBook',
                message: 'Desea argregar un libro?',
                choices: ['Yes', 'No'],
                default: 'No',
            }
        ]);
        return wantoTo;
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
                type: 'number',
                name: 'numeroPaginas',
                message: 'Cúantas páginas tiene el libro?'
            },
            {
                type: 'confirm',
                name: 'leido',
                message: 'Has leido ese libro?',
                default: false,
            },
            {
                type: 'number',
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
                type: 'number',
                name: 'peso',
                message: 'Ingrese el peso'
            },
            {
                type: 'input',
                name: 'idioma',
                message: 'Ingrese el idioma',
                default: 'Español',
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

function saveAutor(autor) {
    let autors = getAutors();
    autors.push(autor);
    saveData(autors);
}

function saveBook(nombre, libro) {
    let autors = getAutors();
    for (autor of autors) {
        if (autor['nombreCompleto'].toLowerCase().includes(nombre.toLowerCase())) {
            autor.libros.push(libro);
            break;
        }
    }
    saveData(autors);
}

function saveAutorEdited(newAutor) {
    let autors = getAutors();
    const aIndex = autors.findIndex(autor => autor['nombreCompleto'] === newAutor.nombreCompleto);
    autors[aIndex] = newAutor;
    saveData(autors);
}

function saveAutorBookEdited(autorName, newBook) {
    let autors = getAutors();
    for (let autor of autors) {
        if (autor['nombreCompleto'].toLowerCase().includes(autorName.toLowerCase())) {
            let books = autor.libros;
            const bIndex = books.findIndex(book => book.titulo === newBook.titulo);
            autor.libros[bIndex] = newBook;
            break;
        }
    }
    saveData(autors);
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

function saveData(autors) {
    fs.writeFileSync(jsonPath, JSON.stringify(autors));
}

// Exportamos las funciones 
module.exports = {
    buscarAutor,
    buscarLibrosAutor,
    getAutors,
    deleteDataAutor,
    deleteBookAutor,
    saveBook,
    saveAutor
}


if (require.main === module) {
    showMenuPrincipal();
}