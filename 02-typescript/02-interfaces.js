//02-interfaces.ts
var usuario = {
    nombre: 'Pierre',
    apellido: 'Dolce',
    casado: false,
    sueldo: 100,
    estado: 'BN',
    imprimirUsuario: function (mensaje) {
        return 'El mensaje es: ' + mensaje;
    },
    calcularImpuesto: function (impuesto) {
        return this.sueldo + this.sueldo * impuesto;
    },
    estadoActual: function () {
        switch (this.estado) {
            case 'AC':
                return 'AP';
            case 'IN':
                return 'AF';
            case 'BN':
                return 'AT';
        }
    }
};
