//04-clases.ts

class Persona {
    public nombre: string;
    public apellido: string;
    public nombreReferencial: string = 'Humano';
    protected nombreYApellido = '' //Duck Typing->string

    constructor(nombreParametro: string, apellidoParametro: string) {
        this.nombre = nombreParametro;
        this.apellido = apellidoParametro;
        this.nombreYApellido = this.nombre + ' ' + this.apellido;
    }

    private mostrarNombreApellido(): string {
        return this.nombreYApellido;
    }
}


//let persona: Persona = new Persona('Juan', 'Perez');

class Usuario extends Persona {

    constructor(nombreParametro: string,
                apellidoParametro: string,
                public cedula: string, //Modificador de acceso -> Propiedad de la clase
                public estadoCivil: string //Modificador de acceso -> Propiedad de la clase
    ) {
        super(nombreParametro, apellidoParametro);
    }
}

const pierre = new Usuario('Pierre', 'Perez', '123456789', 'Soltero');
pierre.nombre;
pierre.apellido;
pierre.cedula;
