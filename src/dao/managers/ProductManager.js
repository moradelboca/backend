import fs from 'fs'
import { randomUUID } from 'crypto'

export class ProductManager{
  constructor(path){
    this.path = path
  }
  async addProduct (title, description, code, price, stock, category, thumbnails=[], status=true){
    const products = await this.getProducts()
    const newProduct = {
      id: randomUUID(),
      status: status,
      title: title,
      description: description,
      code: code,
      price: price,
      stock: stock,
      category: category,
      thumbnails: thumbnails
    }
    // Check if code isnt repeated
    if (products.some( item => item.code === newProduct.code )){
      console.log('Code is repeated!')
      return -1
    }
    const newProducts = JSON.stringify([ ...products, newProduct ])
    try{
      await fs.promises.writeFile(this.path, newProducts)
      return newProduct.id
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
    let newProduct
    const data = await this.getProducts()
    const newData = JSON.stringify(data.map( product =>  {
      // Product that needs to be modified.
      if(product.id === id){
        newProduct = { ...product }
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
      return newProduct
    }
    catch (err){
      console.log(`${err}`)
      return false
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