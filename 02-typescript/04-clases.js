//04-clases.ts
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Persona = /** @class */ (function () {
    function Persona(nombreParametro, apellidoParametro) {
        this.nombreReferencial = 'Humano';
        this.nombreYApellido = ''; //Duck Typing->string
        this.nombre = nombreParametro;
        this.apellido = apellidoParametro;
        this.nombreYApellido = this.nombre + ' ' + this.apellido;
    }
    Persona.prototype.mostrarNombreApellido = function () {
        return this.nombreYApellido;
    };
    return Persona;
}());
//let persona: Persona = new Persona('Juan', 'Perez');
var Usuario = /** @class */ (function (_super) {
    __extends(Usuario, _super);
    function Usuario(nombreParametro, apellidoParametro, cedula, //Modificador de acceso -> Propiedad de la clase
    estadoCivil //Modificador de acceso -> Propiedad de la clase
    ) {
        var _this = _super.call(this, nombreParametro, apellidoParametro) || this;
        _this.cedula = cedula;
        _this.estadoCivil = estadoCivil;
        return _this;
    }
    return Usuario;
}(Persona));
var pierre = new Usuario('Pierre', 'Perez', '123456789', 'Soltero');
pierre.nombre;
pierre.apellido;
pierre.cedula;
