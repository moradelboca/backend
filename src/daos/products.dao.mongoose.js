import mongoose from "mongoose"
import mongoosePaginate from 'mongoose-paginate-v2'
import { NotFoundError } from "../models/Errors.js"

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
    try{
      const products = await this.#productsDb.find().lean()
      return products
    }
    catch(error){
      throw error
    }
  }
  async addProduct(product) {
    try{
      // Checking if code isnt repeated
      const repeated = await this.#productsDb.findOne({ code: product.code })
      if (repeated) throw new Error('Code already exists')
      let saved = await this.#productsDb.create(product)
      return saved
    }
    catch(error){
      throw error
    }
  }
  async getProductByID(id) {
    try{
      let product = await this.#productsDb.findById(id).lean()
      if (!product) throw new NotFoundError('Product not found')
      return product
    }
    catch(error){
      throw error
    }
  }
  async getPage(query, options) {
    try{
      let page = await this.#productsDb.paginate(query, options)
      page = JSON.parse(JSON.stringify(page)) // There isnt a lean option!
      return page
    }
    catch(error){
      throw error
    }
  }
  async updateProduct(id, newPropierties) {
    try{
      if (newPropierties.code) {
        const repeated = await this.#productsDb.findOne({ code: newPropierties.code })
        if (repeated) throw new Error('Code already exists')
      }
      let product = await this.#productsDb.findById(id)
      if (!product) throw new NotFoundError('Product not found')
      for (const prop in newPropierties) {
        product[prop] = newPropierties[prop]
      }
      product.save()
      return product
    }
    catch(error){
      throw error
    }
  }
  async deleteProduct(id) {
    try{
      let product = await this.#productsDb.findById(id)
      if (!product) throw new NotFoundError('Product not found')
      product.deleteOne()
      return product
    }
    catch(error){
      throw error
    }
  }
}

export const productsDao = new ProductsDaoMongoose()
