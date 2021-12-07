//02-interfaces.ts

interface Usuario {
  nombre: string
  apellido: string
  edad?: number // ? indica que el atributo es opcional
  sueldo?: number
  casado: boolean | 0 | 1
  estado: 'AC' | 'IN' | 'BN'
  imprimirUsuario: (mensaje: string) => string | 'BN'
  calcularImpuesto: (impuesto: number) => number
  estadoActual: () => 'AP' | 'AF' | 'AT'
  //calcularImpuesto parametro numero impuesto, sueldo + sueldo * impuesto
  //estadoActual no reciba parametros, retorna AP, AF, AT
}

let usuario: Usuario = {
  nombre: 'Pierre',
  apellido: 'Dolce',
  casado: false,
  sueldo: 100,
  estado: 'BN',
  imprimirUsuario: function (mensaje: string) {
    return 'El mensaje es: ' + mensaje
  },
  calcularImpuesto: function (impuesto: number) {
    return this.sueldo + this.sueldo * impuesto
  },
  estadoActual: function () {
    switch (this.estado) {
      case 'AC':
        return 'AP'
      case 'IN':
        return 'AF'
      case 'BN':
        return 'AT'
    }
  },
}
