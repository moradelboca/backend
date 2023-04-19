import fs from 'fs'
import { randomUUID } from 'crypto'

export class CartsManager{
  constructor(path){
    this.path = path
  }
  async getCarts (){
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
  async addCart (products){
    const carts = await this.getCarts()
    const newCart = {
      id: randomUUID(),
      products: products
    }
    const newCarts = JSON.stringify([ ...carts, newCart ])
    try{
      await fs.promises.writeFile(this.path, newCarts)
      return newCart.id
    }
    catch (err){
      console.log(`${err}`)
      return -1
    }
  }
  async getCartByID(id){
    const carts = await this.getCarts()
    const cart = carts.find( cart => cart.id == id)
    if(!cart){console.log('Error: ID not found')}
    return cart
  }
  async updateCart(id, products){
    const carts = await this.getCarts()
    const newCart = await this.getCartByID(id)
    if (!newCart){ return -1 }
    // Merging 2 lists... Objects re going to be duplicated!
    newCart.products = [ ...newCart.products, ...products ]
    // Reducing duplicated objects
    newCart.products = newCart.products.reduce( (allProducts, currentProduct) => {
      // Check if product is added
      const productIndex = allProducts.findIndex( p => p.id === currentProduct.id )
      if (productIndex != -1) {
        allProducts[productIndex].quantity += currentProduct.quantity
        return [ ...allProducts ]
      }
      // Product isnt in list
      return [ ...allProducts, currentProduct ]
    }, [])
    // Recreating JSON data with updated cart
    const newCarts = JSON.stringify(carts.map( cart =>  cart.id == id ? newCart : cart))
    try{
      await fs.promises.writeFile(this.path, newCarts)
      return newCart.id
    }
    catch (err){
      console.log(`${err}`)
      return -1
    }
  }
}