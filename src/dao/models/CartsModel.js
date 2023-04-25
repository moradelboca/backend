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
    const carts = await this.#cartsDb.find().populate('products.product').lean()
    return carts
  }
  async addCart(cart) {
    let saved = await this.#cartsDb.create({products:cart})
    return saved
  }
  async getCartByID(id){
    const cart = await this.#cartsDb.findOne({ _id: id }).populate('products.product').lean()
    return cart
  }
  async updateCart(id, products){
    const newCart = await this.#cartsDb.findOne({ _id: id })
    if (!newCart){ return -1 }
    // Merging 2 lists... Objects re going to be duplicated!
    newCart.products = [ ...newCart.products, ...products ]
    // Reducing duplicated objects
    newCart.products = newCart.products.reduce( (allProducts, currentProduct) => {
      // Check if product is added
      const productIndex = allProducts.findIndex( p => p.product.toString() === currentProduct.product.toString() )
      if (productIndex != -1) {
        allProducts[productIndex].quantity += currentProduct.quantity
        return [ ...allProducts ]
      }
      // Product isnt in list
      return [ ...allProducts, currentProduct ]
    }, [])
    const updated = await newCart?.save()
    return updated
  }
  async deleteProduct(cartID, productID){
    const newCart = await this.#cartsDb.findOne({ _id: cartID })
    if (!newCart){ throw new Error('Cart wasnt found.') }
    newCart.products = newCart.products.filter( product => product.product.toString() != productID )
    const updated = await newCart?.save()
    return updated
  }
  async deleteAll() {
    await this.#cartsDb.deleteMany({})
    console.log('All carts have been deleted')
    return 1
  }
}

export const cartsModel = new CartsModel()
