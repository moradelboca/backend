import mongoose from 'mongoose'

const schemaCarts = new mongoose.Schema(
  {
    products: [{
      quantity: { type: Number, required: true }, 
      product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'products'
      }
    }]
  }, { versionKey: false }
)

class CartsModel {
  #cartsDb
  constructor() {
    this.#cartsDb = mongoose.model('carts', schemaCarts)
  }
  async getCarts (){
    const carts = await this.#cartsDb.find().lean()
    return carts
  }
  async addCart(cart) {
    let saved = await this.#cartsDb.create({products:cart})
    return saved
  }
  async getCartByID(id){
    const cart = await this.#cartsDb.findOne({ _id: id }).lean()
    return cart
  }
  async updateCart(id, products){
    
  }
  async deleteAll() {
    await this.#cartsDb.deleteMany({})
    console.log('All carts have been deleted')
    return 1
  }
}

schemaCarts.pre(/^find/, function (next) {
  this.populate('products.product')
  next()
})

export const cartsModel = new CartsModel()
