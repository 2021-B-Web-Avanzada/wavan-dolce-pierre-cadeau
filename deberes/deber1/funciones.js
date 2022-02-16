const path = require('path');
const fs = require('fs');
const fileName = 'autor.json';
const jsonPath = path.join(__dirname, fileName);

//Obtener todos los autores
function getAutors() {
    const data = fs.readFileSync(jsonPath);
    return JSON.parse(data);
}

//Escribir el archivo autor.json
function saveData(autors) {
    fs.writeFileSync(jsonPath, JSON.stringify(autors));
}

// Función que guarda un autor en el archivo autor.json
function saveAutor(autor) {
    let autors = getAutors();
    autors.push(autor);
    saveData(autors);
}

// Función para guardar un libro de un autor en el archivo autor.json
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

//Buscar un autor por su nombre
function buscarAutor(nombre) {
    for (const iterator of getAutors()) {
        if (iterator['nombreCompleto'].toLowerCase().includes(nombre.toLowerCase())) {
            return iterator;
        }
    }
    return null;
}

//Guardar los datos del autor actualizado
function saveAutorEdited(newAutor) {
    let autors = getAutors();
    const aIndex = autors.findIndex(autor => autor['nombreCompleto'] === newAutor.nombreCompleto);
    autors[aIndex] = newAutor;
    saveData(autors);
}

//Guardar los datos del libro actualizado
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

//Guardar el archivo despues de eliminar un autor
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

//Guardar el archivo despues de eliminar un libro
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

function buscarLibrosAutor(autor, titulo) {
    const autorEncontrato = buscarAutor(autor);
    if (autorEncontrato != null) {
        return autorEncontrato.libros.filter(function (libro) {
            return libro.titulo.toLowerCase().includes(titulo.toLowerCase());
        });
    }
    return null;
}

// Exportamos las funciones 
module.exports = {
    buscarAutor,
    buscarLibrosAutor,
    getAutors,
    saveAutorBookEdited,
    saveAutorEdited,
    deleteDataAutor,
    deleteBookAutor,
    saveBook,
    saveAutor
}