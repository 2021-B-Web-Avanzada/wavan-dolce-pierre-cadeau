const { Router } = require('express');
const router = Router();
const path = require('path');
const jsPath = path.join(__dirname, '..', '..', '..', 'deber1', 'funciones.js');
const fun = require(jsPath);

// GET
//Raiz
router.get('/', (req, res) => {
    res.json(
        {
            "Title": "Bienvenido al api de los autores y sus libros!"
        }
    );
})

//Autor
router.get('/autors', (req, res) => {
    res.json(fun.getAutors()
    );
})

//Autor by name
router.get('/autor/:autorName', (req, res) => {
    try {
        if (req.query.autor !== "") {
            let autorName = req.params.autorName;
            let autorEncontrato = fun.buscarAutor(autorName);
            res.json(autorEncontrato
            );
        } else {
            res.json(
                {
                    "error": "Debes ingrear un nombre"
                }
            );
            res.sendStatus('400')
        }
    } catch (e) {
        res.sendStatus('400')
    }
})

//Libros by autor
router.get('/libros/:autor&:title', (req, res) => {
    try {
        let autor = req.params.autor;
        let title = req.params.title;
        const libro = fun.buscarLibrosAutor(autor, title);
        res.json(libro
        );
    } catch (e) {
        res.sendStatus('400')
    }
})

//POST
//Crear autor
router.post('/autor', (req, res) => {
    try {
        let nombre = req.body.nombre;
        let apellido = req.body.apellido;
        let edad = req.body.edad;
        let direccion = req.body.direccion;
        let nacionalidad = req.body.nacionalidad;
        let nombreCompleto = nombre + " " + apellido;
        if (nombre !== undefined && apellido !== undefined && edad !== undefined && direccion !== undefined && nacionalidad !== undefined) {
            let autor = {
                nombre: nombre,
                apellido: apellido,
                edad: edad,
                direccion: direccion,
                nacionalidad: nacionalidad,
                nombreCompleto: nombreCompleto,
                libros: []
            };
            fun.saveAutor(autor);
            res.json({
                "message": "Autor creado con exito"
            });
        } else {
            res.json({
                "error": "Error al crear el autor"
            });
        }
    } catch (e) {
        res.json(
            {
                "error": "Error al buscar autor"
            }
        );
    }
})

//Crear libro
router.post('/libros', (req, res) => {
    try {
        let nombre = req.body.nombre;
        let titulo = req.body.titulo;
        let numeroPaginas = req.body.numeroPaginas;
        let leido = req.body.leido;
        let precio = req.body.precio;
        let editorial = req.body.editorial;
        let isbn = req.body.isbn;
        let peso = req.body.peso;
        let idioma = req.body.idioma;
        let fecha = req.body.fecha;
        let dimension = req.body.dimension;

        if (nombre !== undefined && titulo !== undefined && numeroPaginas !== undefined && leido !== undefined && precio !== undefined && editorial !== undefined && isbn !== undefined && peso !== undefined && idioma !== undefined && fecha !== undefined && dimension !== undefined) {
            let libro = {
                nombre: nombre,
                titulo: titulo,
                numeroPaginas: numeroPaginas,
                leido: leido,
                precio: precio,
                editorial: editorial,
                isbn: isbn,
                peso: peso,
                idioma: idioma,
                fecha: fecha,
                dimension: dimension
            };
            fun.saveBook(nombre, libro);
            res.json({
                "message": "Libro creado con exito"
            });
        } else {
            res.json({
                "error": "Error al crear el libro"
            });
        }
    } catch (e) {
        res.json(
            {
                "error": "Error al buscar autor"
            }
        );
    }
})


//PUT
//Actualizar autor
router.put('/autor', (req, res) => {
    try {
        let nombre = req.body.nombre;
        let direccion = req.body.direccion;
        let nacionalidad = req.body.nacionalidad;
        if (nombre !== undefined && direccion !== undefined && nacionalidad !== undefined) {
            let newAutor = {
                direccion: direccion,
                nacionalidad: nacionalidad,
            };
            let oldAutor = fun.buscarAutor(nombre);
            const autorCompleto = {
                ...oldAutor,
                ...newAutor
            }
            fun.saveAutorEdited(autorCompleto);
            res.json({
                "message": "Autor actualizado con exito"
            });
        } else {
            res.json({
                "error": "Error al actualizar el autor"
            });
        }
    } catch (e) {
        res.json(
            {
                "error": "Error al actualizar el autor"
            }
        );
    }
})

//Actualizar libro
router.put('/libros', (req, res) => {
    try {
        let nombre = req.body.nombre;
        let titulo = req.body.titulo;
        let leido = req.body.leido;
        let precio = req.body.precio;
        if (nombre !== undefined && titulo !== undefined && leido !== undefined && precio !== undefined) {
            let newBook = {
                leido: leido,
                precio: precio,
            };
            const libro = fun.buscarLibrosAutor(nombre, titulo);
            const libroCompleto = {
                ...libro[0],
                ...newBook
            }
            fun.saveAutorBookEdited(nombre, libroCompleto);
            res.json({
                "message": "Libro actualizado con exito"
            });
        } else {
            res.json({
                "error": "Error al actualizar el libro"
            });
        }
    } catch (e) {
        console.log(e);
        res.json(
            {
                "error": "Error al actualizar el libro"
            }
        );
    }
})

//DELETE
//Eliminar autor
router.delete('/autor/:autorName', (req, res) => {
    const autorName = req.params.autorName;
    try {
        fun.deleteDataAutor(autorName);
        res.json(
            {
                "response": "True"
            }
        );
    } catch (e) {
        res.json(
            {
                "error": "Error al eliminar autor"
            }
        );
    }
})

//Eliminar libro
router.delete('/libros/:autorName&:title', (req, res) => {
    const autorName = req.params.autorName;
    const bookTitle = req.params.title;
    try {
        fun.deleteBookAutor(autorName, bookTitle);
        res.json(
            {
                "response": "True"
            }
        );
    } catch (e) {
        res.json(
            {
                "error": "Error al eliminar autor"
            }
        );
    }
})

module.exports = router;