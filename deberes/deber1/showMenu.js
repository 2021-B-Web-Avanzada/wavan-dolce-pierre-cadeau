const inquirer = require('inquirer');
const { getAutors, buscarAutor, buscarLibrosAutor, saveAutorBookEdited, saveAutorEdited, deleteDataAutor, deleteBookAutor, saveBook, saveAutor } = require("./funciones");


//Mostrar el menu principal
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
    } catch (error) {
    }
}

//Mostrar el menu de autor
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
            createAutor();
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

//Para mostrar todos los autores
function showAutors() {
    const autors = getAutors();
    console.log(autors);
    showMenuAutor();
}

//Mostrar el menu de libro
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

//Mostrar el menu para agregar libro a un autor
async function addBookToAutor() {
    try {
        const autor = await showAutorList();
        await crearLibro(autor.name);
    } catch (error) {
        console.error(error);
    }
    showMenuBook();
}

//Para buscar un autor
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

//Mostar la lista de los autores para elegir
async function showAutorList() {
    let au = [];
    getAutors().forEach(element => {
        au.push(element.nombreCompleto);
    })
    return await inquirer.prompt([
        {
            type: 'list',
            name: 'name',
            message: 'Choose an autor',
            choices: au,
        },
    ]);
}

//Para buscar un libro
async function searchBook() {
    try {
        const autor = await showAutorList();
        const libro = await inquirer.prompt([
            {
                type: 'input',
                name: 'titulo',
                message: 'Ingresa el titulo del libro'
            },
        ]);
        console.log(buscarLibrosAutor(autor.name, libro.titulo));
    } catch (error) {
        console.error(error);
    }
    showMenuBook();
}


//Para mostrar informacion de un autor
async function showBookAutor() {
    try {
        const autor = await showAutorList();
        console.log(buscarAutor(autor.name));
    } catch (error) {
        console.error(error);
    }
    showMenuBook();
}

//Mostrar la lista de los libros de un autor para elegir
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

//Menu de ingreso de datos para agregar un autor
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

//Si se desea agregar un libro al nuevo autor creado
async function wantToAddBook() {
    try {
        return await inquirer.prompt([
            {
                type: 'list',
                name: 'addBook',
                message: 'Desea argregar un libro?',
                choices: ['Yes', 'No'],
                default: 'No',
            }
        ]);
    } catch (error) {
        console.error(error);
    }
}

//Para crear un autor
async function createAutor() {
    const autor = await addAutor();
    const addBook = await wantToAddBook();
    autor.libros = [];
    saveAutor(autor);
    if (addBook.addBook === 'Yes') {
        await crearLibro(autor.nombreCompleto);
    }
    showMenuAutor();
}


//Menu de ingreso de datos para agregar un libro
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
        libro.dimension = await getDimension();
        saveBook(autor, libro);
    } catch (error) {
        console.error(error);
    }
}

//para obtener la dimension del libro
async function getDimension() {
    try {
        return await inquirer.prompt([
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
    } catch (error) {
        console.error(error);
    }
}

//Menu para editar un autor
async function editAutor() {
    try {
        const autor = await showAutorList();
        await editAutorData(autor.name);
    } catch (error) {
        console.error(error);
    }
    showMenuAutor();
}

//Obtiene los datos editable del autor
async function editAutorData(name) {
    const autors = getAutors();
    for (autor of autors) {
        if (autor['nombreCompleto'].toLowerCase().includes(name.toLowerCase())) {
            await showAutorToEdit(autor);
            break;
        }
    }
}


//Mostrar los campos que se puede editar de una autor
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

//Menu para editar un libro
async function editBook() {
    try {
        const autor = await showAutorList();
        await editAutorBooksData(autor.name);
    } catch (error) {
        console.error(error);
    }
    showMenuBook();
}

//Mostrar el menu para poder editar un libro de un autor
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

//Mostrar el libro que se selecciono para editar
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

//Mostrar el menu de eliminar  autor
async function deleteAutor() {
    try {
        const autor = await showAutorList();
        deleteDataAutor(autor.name);
    } catch (error) {
        console.error(error);
    }
    showMenuAutor();
}

//Mostrar el menu de eliminar libro
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





exports.showMenuPrincipal = showMenuPrincipal;