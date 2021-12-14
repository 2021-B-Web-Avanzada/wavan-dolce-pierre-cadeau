const { Router } = require('express');
const router = Router();
const path = require('path');
const jsPath = path.join(__dirname, '..', '..', '..', 'deber1', 'obtenerDatos.js');
const dataModule = require(jsPath);

// GET

//Raiz
router.get('/', (req, res) => {
    res.json(
        {
            "Title": "Hola mundo usando rutas!"
        }
    );
})

//Autor
router.get('/allAutor', (req, res) => {
    res.json(dataModule.autors
    );
})

//Autor by name
router.get('/autor', (req, res) => {
    try {
        if (req.query.autor !== "") {
            let autorName = req.query.autor;
            let autorEncontrato = dataModule.buscarAutor(autorName);
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
router.get('/libros', (req, res) => {
    
    let autor = req.query.autor;
    let title = req.query.title;

    console.log(autor, title);

    const libro = dataModule.buscarLibrosAutor(autor, title);
    res.json(libro
    );
})

//POST

router.post('/autor', (req, res) => {
    try {
        console.log(req.body);
        if (req.body.autor !== "") {
            let autorName = req.body.autor;
            let autorEncontrato = dataModule.buscarAutor(autorName);
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
        res.json(
            {
                "error": "Error al buscar autor"
            }
        );
    }

})

module.exports = router;