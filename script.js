class Usuario{
  constructor (nombre, apellido,){
    this.nombre = nombre
    this.apellido = apellido
    this.libros = []
    this.mascotas = []
  }
  getFullName(){
    return `${this.nombre} ${this.apellido}`
  }
  addMascota(nombreMascota){
    this.mascotas.push(nombreMascota)
  }
  countMascotas(){
    return this.mascotas.length
  }
  addBook(nombre, autor){
    this.libros.push({ nombre:nombre, autor:autor })
  }
  getBookNames(){
    return this.libros.map( book => book.nombre )
  }
}

const user = new Usuario("Elon", "Musk")

user.addMascota("perro")
user.addMascota("gato")
console.log(user.countMascotas())

user.addBook("El señor de las moscas", "William Golding")
user.addBook("Fundacion", "Isaac Asimov")
console.log(user.getBookNames())

console.log(user.getFullName())