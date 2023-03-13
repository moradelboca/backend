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
    const data = await this.getCarts()
    const cart = data.find( cart => cart.id == id)
    if(!cart){console.log('Error: ID not found')}
    return cart
  }
}