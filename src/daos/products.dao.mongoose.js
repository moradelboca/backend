import mongoose from '../database/mongoose.js'
import mongoosePaginate from 'mongoose-paginate-v2'

const productsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    code: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, min: 0 },
    category: { type: Number, required: true },
    thumbnails: { type: [String], required: true },
    status: { type: Boolean, default: true },
  },
  { versionKey: false }
)

productsSchema.plugin(mongoosePaginate)

class ProductsDaoMongoose {
  #productsDb
  constructor() {
    this.#productsDb = mongoose.model('products', productsSchema)
  }
  async createProduct(product) {
    return await this.#productsDb.create(product)
  }
  async getProducts(query, options) {
    let products
    if(!options && !query) { 
      products = await this.#productsDb.find().lean()
    }
    else{
      products = await this.#productsDb.paginate(query, options)
      products = JSON.parse(JSON.stringify(products)) // There isnt a lean option!
    }
    return products
  }
  async getProductByID(id) {
    return await this.#productsDb.findById(id).lean()
  }
  async getProductByCode(code) {
    return await this.#productsDb.findById(code).lean()
  }
  async updateProduct(id, newPropierties) {
    let product = await this.#productsDb.findById(id)
    for (const prop in newPropierties) { product[prop] = newPropierties[prop] }
    product.save()
    return product
  }
  async deleteProduct(id) {
    let product = await this.#productsDb.findById(id)
    product.deleteOne()
    return product
  }
}

export const productsDao = new ProductsDaoMongoose()
