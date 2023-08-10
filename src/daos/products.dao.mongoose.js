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
  async getProducts() {
    const products = await this.#productsDb.find().lean()
    return products
  }
  async addProduct(product) {
    // Checking if code isnt repeated
    const repeated = await this.#productsDb.findOne({ code: product.code })
    if (repeated) {
      console.log('Code is repeated!')
      return -1
    }
    let saved = await this.#productsDb.create(product)
    return saved
  }
  async getProductByID(id) {
    try {
      let product = await this.#productsDb.findById(id).lean()
      return product
    }
    catch (error) {
      console.log(error)
    }
  }
  async getPage(query, options) {
    let page = await this.#productsDb.paginate(query, options)
    page = JSON.parse(JSON.stringify(page)) // There isnt a lean option!
    return page
  }
  async updateProduct(id, newPropierties) {
    const updatedProduct = await this.#productsDb.updateOne({ _id: id }, newPropierties)
    return updatedProduct
  }
  async deleteProduct(id) {
    const exists = await this.getProductByID(id)
    if (!exists) {
      console.log('Product wasnt found!')
      return -1
    }
    await this.#productsDb.deleteOne({ _id: id })
    console.log('Product have been deleted.')
    return 1
  }
  async deleteAll() {
    await this.#productsDb.deleteMany({})
    console.log('All products have been deleted')
    return 1
  }
}

export const productsDao = new ProductsDaoMongoose()
