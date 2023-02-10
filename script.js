class ProductManager{
  constructor(){
    this.products = []
  }
  addProduct(product){
    // Check if code isnt repeated
    if (this.products.some( item => item.code === product.code )){return false}

    product.id = this.products.length + 1 // IMPORTANT! This code is only valid because we cant take out products. Needs to be refactored if necessary!
    this.products.push(product)
    return true
  }
  getProducts(){
    return this.products
  }
  getProductById(id){
    return this.products.find( product => product.id === id ) || 'Product wasnt found!'
  }
}

// Creating a class Product will avoid unnecesary atributes in each product. In this case, ill replace checking each if an input has all atributes using this concept.
class Product{
  constructor(title, description, price, thumbnail, code, stock){
    this.title = title
    this.description = description
    this.price = price
    this.thumbnail = thumbnail
    this.code = code
    this.stock =  stock
  }
}

const pm = new ProductManager()

pm.addProduct(new Product('Collar', 'De perlas, negro', 1200, 'fakeurl.com', 1233, 7))
pm.addProduct(new Product('Collar', 'De hilo, gris', 400, 'fakeurl.com', 456456454, 50))
pm.addProduct(new Product('Pulsera', 'De escamas, blanco', 500, 'fakeurl.com', 1233, 5)) // This wont be added cause code is repeated!
pm.addProduct(new Product('Pulsera', 'Cadena metalica con dije amarillo', 2500, 'fakeurl.com', 4433, 2))

console.log( pm.getProducts() )

console.log( pm.getProductById(2) )
console.log( pm.getProductById(10) )