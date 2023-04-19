import mongoose from "mongoose"

const schemaProducts = new mongoose.Schema(
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

class ProductsModel {
  #productsDd
  constructor() {
    this.#productsDd = mongoose.model('products', schemaProducts)
  }
  async getProducts() {
    const products = await this.#productsDd.find().lean()
    return products
  }
  async addProduct(product) {
    // Checking if code isnt repeated
    const repeated = await this.#productsDd.findOne({ code: product.code })
    if (repeated) {
      console.log('Code is repeated!')
      return -1
    }
    let saved = await this.#productsDd.create(product)
    return saved
  }
  async getProductByID(id) {
    const product = await this.#productsDd.findOne({ _id: id }).lean()
    return product
  }
  async updateProduct(id, newPropierties) {
    const updatedProduct = await this.#productsDd.updateOne({ _id: id }, newPropierties)
    return updatedProduct
  }
  async deleteProduct(id) {
    const exists = await this.getProductByID(id)
    if (!exists) {
      console.log('Product wasnt found!')
      return -1
    }
    await this.#productsDd.deleteOne({ _id: id })
    console.log('Product have been deleted.')
    return 1
}
async deleteAll() {
    await this.#productsDd.deleteMany({})
    console.log('All products have been deleted')
    return 1
  }
}

export const productsModel = new ProductsModel()
