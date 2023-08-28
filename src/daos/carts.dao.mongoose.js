import mongoose from '../database/mongoose.js'
import crypto from "crypto"

const cartsSchema = new mongoose.Schema(
  {
    _id: false,
    id: { type: String, required: true, unique: true },
    products: [{
      _id: false,
      quantity: { type: Number }, 
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products'
      }
    }]
  }, { versionKey: false }
)

class CartsDaoMongoose {
  #cartsDb
  constructor() {
    this.#cartsDb = mongoose.model('carts', cartsSchema)
  }
  async getCarts (){
    return await this.#cartsDb.find().populate('products.product').lean()
  }
  async createEmptyCart() {
    return await this.#cartsDb.create({ id: crypto.randomUUID(), products: [] })
  }
  async getCartByID(id){
    return await this.#cartsDb.findOne({ id: id }).populate('products.product').lean()
  }
  async updateCart(id, products){
    const cart = await this.#cartsDb.findOne({ id: id })
    products.forEach( currentProduct => {
      const productIndex = cart.products.findIndex( p => p.product.toString() === currentProduct.product.toString() )
      if (productIndex != -1) {
        cart.products[productIndex].quantity += currentProduct.quantity
      } else {
        cart.products.push(currentProduct)
      }
    })
    await cart?.save()
    return cart
  }
  async deleteProduct(cartID, productID){
    const cart = await this.#cartsDb.findOne({ id: cartID })
    cart.products = cart.products.filter( p => p.product.toString() !== productID.toString() )
    await cart?.save()
    return cart.toObject()
  }
  async deleteCart(id){
    let cart = await this.#cartsDb.findOne({ id: id })
    cart.deleteOne()
    return cart
  }
  async updateProduct(cartID, productID, quantity){
    const cart = await this.#cartsDb.findOne({ id: cartID })
    cart.products = cart.products.map( product => {
      if (product.id.toString() === productID) {
        product.quantity += quantity
      }
      return product
    })
    await cart?.save()
    return cart
  }
}

export const cartsDao = new CartsDaoMongoose()
