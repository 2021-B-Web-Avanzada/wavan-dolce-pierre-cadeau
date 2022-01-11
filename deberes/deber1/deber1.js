const { showMenuPrincipal } = require("./showMenu");

//para mantener el formato al imprimir objetos
require('util').inspect.defaultOptions.depth = null


if (require.main === module) {
    showMenuPrincipal();
}