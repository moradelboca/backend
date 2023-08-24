import { cartsRepository } from "../repositories/carts.repository.js"
import { NotFoundError } from "../models/Errors.js"
import { productsService } from "./products.service.js"
import { ticketService } from "./ticket.service.js"

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
      const cart = await this.getCartByID(id)
      products.forEach( currentProduct => {
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
      const cart = await this.getCartByID(cartID)
      const productIndex = cart.products.findIndex( p => p.product._id.toString() === productID.toString() )
      if (productIndex === -1) throw new NotFoundError('Product wasnt found.')
      return await this.repository.deleteProduct(cartID, productID)
    }
    catch(error){
      throw error
    }
  }
  async deleteCart(id) {
    try{
      const cart = await this.getCartByID(id)
      return await this.repository.deleteCart(id)
    }
    catch(error){
      throw error
    }
  }
  async updateProduct(cartID, productID, quantity) {
    try{
      const cart = await this.getCartByID(cartID)
      const product = cart.products.find( p => p.product.toString() === productID )
      if (!product) throw new NotFoundError('Product wasnt found.')
      return await this.repository.updateProduct(cartID, productID, quantity)
    }
    catch(error){
      throw error
    }
  }
  async purchaseCart(id, purchaserEmail) {
    try{
      const cart = await this.getCartByID(id)
      // For each product, check if it exists and if there is enough stock.
      let productsWithoutStock = []
      let boughtProducts = []
      for (const productData of cart.products) {
        if (productData.quantity > productData.product.stock) productsWithoutStock.push(productData)
        else {
          boughtProducts.push({ ...productData })
          await this.deleteProduct(id, productData.product._id)
          await productsService.updateProduct(productData.product._id, {stock: productData.product.stock - productData.quantity})
        }
      }
      if (boughtProducts.length === 0) throw new Error('No products were bought')
      const ticket = await ticketService.createTicket(boughtProducts, purchaserEmail, id)
      return {boughtProducts: boughtProducts, productsWithoutStock: productsWithoutStock, ticket: ticket}
    }
    catch(error){
      throw error
    }
  }
}

export const cartsService = new CartsService(cartsRepository)