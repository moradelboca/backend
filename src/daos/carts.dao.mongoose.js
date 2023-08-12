import mongoose from '../database/mongoose.js'
import { NotFoundError } from '../models/Errors.js'

const cartsSchema = new mongoose.Schema(
  {
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
    try{
      const carts = await this.#cartsDb.find().populate('products.product').lean()
      return carts
    }
    catch(error){
      throw error
    }
  }
  async createEmptyCart() {
    try{
      let saved = await this.#cartsDb.create({ products: []})
      return saved
    }
    catch(error){
      throw error
    }
  }
  async getCartByID(id){
    try{
      const cart = await this.#cartsDb.findOne({ _id: id }).populate('products.product').lean()
      if(!cart) throw new NotFoundError('Cart not found')
      return cart
    }
    catch(error){
      throw error
    }
  }
  async updateCart(id, products){
    try{
      const newCart = await this.#cartsDb.findOne({ _id: id })
      if (!newCart) throw new NotFoundError('Cart wasnt found.')
      products.forEach( currentProduct => {
        const productIndex = newCart.products.findIndex( p => p.product.toString() === currentProduct.product.toString() )
        if (productIndex != -1) {
          newCart.products[productIndex].quantity += currentProduct.quantity
        } else {
          newCart.products.push(currentProduct)
        }
      })
      const updated = await newCart?.save()
      return updated
    }
    catch(error){
      throw error
    }
  }
  async deleteProduct(cartID, productID){
    try{
      const newCart = await this.#cartsDb.findOne({ _id: cartID })
      if (!newCart){ throw new NotFoundError('Cart wasnt found.') }
      let productWasFound = false
      newCart.products = newCart.products.filter( product => { 
        if (product.product.toString() === productID) {
          productWasFound = true
          return false
        }
        return true
      }) 
      if (!productWasFound) throw new NotFoundError('Product wasnt found.')
      const updated = await newCart?.save()
      return updated
    }
    catch(error){
      throw error
    }
  }
  async deleteCart(id){
    try{
      let cart = await this.#cartsDb.findById(id)
      if (!cart) throw new NotFoundError('Cart not found')
      cart.deleteOne()
      return cart
    }
    catch(error){
      throw error
    }
  }
  async updateProduct(cartID, productID, quantity){
    const newCart = await this.#cartsDb.findOne({ _id: cartID })
    if (!newCart) throw new NotFoundError('Cart wasnt found.')
    const productIndex = newCart.products.findIndex( p => p.product.toString() === productID )
    if (productIndex === -1) throw new NotFoundError('Product wasnt found.')
    newCart.products[productIndex].quantity = quantity
    const updated = await newCart?.save()
    return updated
  }
}

export const cartsDao = new CartsDaoMongoose()
