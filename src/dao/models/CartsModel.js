import mongoose from 'mongoose'

const schemaCarts = new mongoose.Schema(
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

class CartsModel {
  #cartsDb
  constructor() {
    this.#cartsDb = mongoose.model('carts', schemaCarts)
  }
  async getCarts (){
    const carts = await this.#cartsDb.find().populate('products.product').lean()
    return carts
  }
  async createCart() {
    let saved = await this.#cartsDb.create({ products: []})
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
    newCart.products = newCart.products.concat(products)
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
  async deleteCart(id){
    const deleted = await this.#cartsDb.deleteOne({ _id: id })
    return deleted
  }
  async updateProduct(cartID, productID, quantity){
    const newCart = await this.#cartsDb.findOne({ _id: cartID })
    if (!newCart){ return -1 }
    const productIndex = newCart.products.findIndex( p => p.product.toString() === productID )
    if (productIndex != -1) {
      newCart.products[productIndex].quantity = quantity
      const updated = await newCart?.save()
      return updated
    }
    return -1
  }
  async deleteAll() {
    await this.#cartsDb.deleteMany({})
    console.log('All carts have been deleted')
    return 1
  }
}

export const cartsModel = new CartsModel()
