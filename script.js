import { debug } from 'console'
import { checkPrimeSync } from 'crypto'
import fs from 'fs'

class ProductManager{
  constructor(path){
    this.path = path
  }
  async addProduct(title, description, price, thumbnail, code, stock){
    const products = await this.getProducts()
    // Check if code isnt repeated
    if (products.some( item => item.code === code )){
      console.log('Error: Code is repeated!')
      return -1
    }
    // Generating ID
    let id = !products.length ? 1 : products[products.length-1].id+1
    const newProducts = JSON.stringify([ ...products, {id, title, description, price, thumbnail, code, stock } ])
    try{
      await fs.promises.writeFile(this.path, newProducts)
      return id
    }
    catch (err){
      console.log(`${err}`)
      return -1
    }
  }
  async getProducts(){
    try{
      const data = await fs.promises.readFile(this.path, 'utf-8')
      return data ? JSON.parse(data) : []
    }
    catch (err){
      console.log(`${err}`)
      // Just to avoid future errors...
      return []
    }
  }
  async getProductByID(id){
    const data = await this.getProducts()
    const product = data.find( product => product.id == id)
    if(!product){console.log('Error: ID not found')}
    return product
  }
  async deleteProduct(id){
    const data = await this.getProducts()
    // Update data without the product that needs to be deleted.
    const newData = JSON.stringify(data.filter( product => product.id != id ))
    try{
      await fs.promises.writeFile(this.path, newData)
    }
    catch (err){
      console.log(`${err}`)
    }
  }
  async updateProduct(id, newPropierties){
    const data = await this.getProducts()
    const newData = JSON.stringify(data.map( product =>  {
      // Product that needs to be modified.
      if(product.id === id){
        const newProduct = { ...product }
        for (let property in newPropierties){
          if(property in product && property != 'id'){newProduct[property] = newPropierties[property]}
        }
        return newProduct
      }
      return product
    }))
    // Writing new data to file.
    try{
      await fs.promises.writeFile(this.path, newData)
    }
    catch (err){
      console.log(`${err}`)
    }
  }
  async deleteAll(){
    try{
      await fs.promises.writeFile(this.path, JSON.stringify([]))
    }
    catch (err){
      console.log(`Error: ${err}`)
    }
  }
}

async function test (){
  // Create a products countainer
  console.log('1- PM created')
  const pm = new ProductManager('./static/products.json')
  // Getting all items just to check it's empty
  let products = await pm.getProducts() 
  console.log(products, '\n\n')
  
  // Adding 4 produts to the file
  await pm.addProduct('Titulo1', 'Descripcion1', 1000, 'fakeurl.com', 'I1MSMS2', 3)
  await pm.addProduct('Titulo2', 'Descripcion2', 2000, 'fakeurl.com', 'IASD221', 10)
  await pm.addProduct('Titulo3', 'Descripcion3', 3000, 'fakeurl.com', 'VVAS45E', 80)
  await pm.addProduct('Titulo4', 'Descripcion4', 4000, 'fakeurl.com', 'DDWGHG3', 6)
  await pm.addProduct('Titulo5', 'Descripcion5', 5000, 'fakeurl.com', 'RERY3FG', 2)
  // This wont be added cause code is repeated!
  await pm.addProduct('Titulo6', 'Descripcion6', 6000, 'fakeurl.com', 'RERY3FG', 100)
  products = await pm.getProducts()
  console.log('2- Products added')
  console.log(products, '\n\n')
  
  // Deleting 3rd product
  await pm.deleteProduct(3)
  // Modifying 1st product title and description. Id wont be modified!
  await pm.updateProduct(40, {id:1231231, thumbnail:'www.modifiedurl.com', description:'Nueva Descripcion'})
  products = await pm.getProducts()
  console.log('3- Product 3 deleted and 4rd modified')
  console.log(products, '\n\n')
  
  //Looking for product 4
  const product = await pm.getProductByID(4)
  console.log('4- Getting product with ID "4"')
  console.log(product, '\n\n')

  // Deleting all products
  pm.deleteAll()
  products = await pm.getProducts()
  console.log('5- All products have been deleted')
  console.log(products, '\n\n')
}

test()