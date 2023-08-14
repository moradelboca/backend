import { cartsRepository } from "../repositories/carts.repository.js"
import { NotFoundError } from "../models/Errors.js"
import { productsService } from "./products.service.js"

class CartsService{
  constructor(repository) {
    this.repository = repository
  }
  async getCarts() {
    try{
      return await this.repository.getCarts()
    }
    catch(error){
      throw error
    }
  }
  async createEmptyCart() {
    try{
      return await this.repository.createEmptyCart()
    }
    catch(error){
      throw error
    }
  }
  async getCartByID(id) {
    try{
      const cart = await this.repository.getCartByID(id)
      if(!cart) throw new NotFoundError('Cart not found')
      return cart
    }
    catch(error){
      throw error
    }
  }
  async updateCart(id, products) {
    try{
      const cart = await this.repository.getCartByID(id)
      if (!cart) throw new NotFoundError('Cart wasnt found.')
      products.forEach( currentProduct => {
        // Throws an error if the product doesnt exist
        productsService.getProductByID(currentProduct.product)
      })
      return await this.repository.updateCart(id, products)
    }
    catch(error){
      throw error
    }
  }
  async deleteProduct(cartID, productID) {
    try{
      const cart = await this.repository.getCartByID(cartID)
      if (!cart) throw new NotFoundError('Cart wasnt found.')
      const productIndex = cart.products.findIndex( p => p.product.toString() === productID )
      if (productIndex === -1) throw new NotFoundError('Product wasnt found.')
      return await this.repository.deleteProduct(cartID, productID)
    }
    catch(error){
      throw error
    }
  }
  async deleteCart(id) {
    try{
      const cart = await this.repository.getCartByID(id)
      if (!cart) throw new NotFoundError('Cart wasnt found.')
      return await this.repository.deleteCart(id)
    }
    catch(error){
      throw error
    }
  }
  async updateProduct(cartID, productID, quantity) {
    try{
      const cart = await this.repository.getCartByID(cartID)
      if (!cart) throw new NotFoundError('Cart wasnt found.')
      const product = cart.products.find( p => p.product.toString() === productID )
      if (!product) throw new NotFoundError('Product wasnt found.')
      return await this.repository.updateProduct(cartID, productID, quantity)
    }
    catch(error){
      throw error
    }
  }
}

export const cartsService = new CartsService(cartsRepository)