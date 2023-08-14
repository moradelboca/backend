import mongoose from '../database/mongoose.js'

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
    return await this.#cartsDb.find().populate('products.product').lean()
  }
  async createEmptyCart() {
    return await this.#cartsDb.create({ products: []})
  }
  async getCartByID(id){
    return await this.#cartsDb.findOne({ _id: id }).populate('products.product').lean()
  }
  async updateCart(id, products){
    cart = await this.#cartsDb.findOne({ _id: id })
    products.forEach( currentProduct => {
      const productIndex = newCart.products.findIndex( p => p.product.toString() === currentProduct.product.toString() )
      if (productIndex != -1) {
        newCart.products[productIndex].quantity += currentProduct.quantity
      } else {
        newCart.products.push(currentProduct)
      }
    })
    await cart?.save()
    return cart
  }
  async deleteProduct(cartID, productID){
    const cart = await this.#cartsDb.findOne({ _id: cartID })
    cart.products = newCart.products.filter( product => product._id.toString() !== productID )
    await cart?.save()
    return cart
  }
  async deleteCart(id){
    let cart = await this.#cartsDb.findById(id)
    cart.deleteOne()
    return cart
  }
  async updateProduct(cartID, productID, quantity){
    const cart = await this.#cartsDb.findOne({ _id: cartID })
    cart.products = cart.products.map( product => {
      if (product._id.toString() === productID) {
        product.quantity += quantity
      }
      return product
    })
    await cart?.save()
    return cart
  }
}

export const cartsDao = new CartsDaoMongoose()
