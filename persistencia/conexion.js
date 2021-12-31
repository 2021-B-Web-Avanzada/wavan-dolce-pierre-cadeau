const Sequelize = require("Sequelize")
database = "donpato";

const db = new Sequelize(database, 'root', '', {
    host: 'localhost',    // Dirección de la base de datos, por defecto esta máquina
    port: '3306',
    dialect: 'mysql',
    pool: {   // Configuración del grupo de conexiones
        max: 5, // Número máximo de conexiones
        min: 0, // Número mínimo de conexiones
        idle: 10000
    },
});


const users = db.define('cliente'/* Nombre de la tabla personalizada */, {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,       //Clave primaria
        autoIncrement: true,    //Incrementar
        comment: "Aumentar id"       // Comentario: solo válido en el código
    },
    codigo_cliente: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    // nombre de usuario
    nombre: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    //cedula
    cedula: {
        type: Sequelize.STRING(10),
        allowNull: false,// No se permite nulo
    },
    //estado
    correo: {
        type: Sequelize.STRING,
        validator: {
            isEmail: true
        }
    },
    //telefono
    cedula: {
        type: Sequelize.STRING(10),
        allowNull: false,// No se permite nulo
    },
    //direccion
    direccion: {
        type: Sequelize.STRING,
        allowNull: false,// No se permite nulo
    },
    //ubicacion
    ubicacion: {
        type: Sequelize.STRING,
        allowNull: false,// No se permite nulo
    },

}, {
    // Usar nombre de tabla personalizado
    freezeTableName: true,
    // Elimina la hora predeterminada para agregar y actualizar
    timestamps: false,
    indexes: [
        // Índice normal, BTREE por defecto
        {
            unique: true,
            fields: ['pid']
        },
    ]
});
// Sincronización: crea uno nuevo si no hay
// users.sync();
// Sincronizar después de eliminar
/*users.sync({
    force: true
});*/


let list = users.findAll({
    attributes: ["nombre", "cedula", "correo"], // Campo devuelto
});
/*
list.then(function (result) {
    console.log();
    console.log("Lista de usuarios");
    console.log("-----------------");
    result.forEach(function (element) {
        console.log(element.nombre + " " + element.cedula + " " + element.correo);
    });
    console.log();
});*/

(async () => {
    let model = await users.findByPk(1);
    console.log(model.nombre);

    let model2 = await users.findOne({
        where:{id:6}
    });
    console.log(model2.nombre);
})()