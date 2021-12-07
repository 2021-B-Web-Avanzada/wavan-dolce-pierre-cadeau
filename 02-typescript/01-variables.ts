//01-variables

let nombre: string = 'Pierre' //primitivo
let nombre2: String = 'Pierre2' //Clase String
//nombre = 1;
nombre = 'Cadeau'

let edad: number = 23
let casado: boolean = false
let fecha: Date = new Date()
let sueldo: number
sueldo = 12.3

//Duck typing
let apellido = 'Dolce' //string
apellido = 'Dolce2' //Igualar a otros strings
apellido.toUpperCase() //Metodos de string

let marihuana: any = 2
marihuana = '2'
marihuana = true
marihuana = () => '2'

let edadMultiple: number | string | Date = 23
edadMultiple = '23'
edadMultiple = 2222
edadMultiple = 'dos'
edadMultiple = new Date()
//edadMultiple = true
