const express = require('express');
const app = express();
const cors = require('cors')
app.use(cors())
const morgan = require('morgan');
//Configuraciones
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2)
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//Routes
app.use(require('./routes/index'));



//Iniciando el servidor, escuchando...
app.listen(app.get('port'),()=>{
    console.log(`Server listening on port ${app.get('port')}`);
}); 