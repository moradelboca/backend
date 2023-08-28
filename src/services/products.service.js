import { NotFoundError, InvalidDataError } from '../models/Errors.js'
import { productsRepository } from '../repositories/products.repository.js'
import { Product } from '../models/Products.js'

class ProductsService{
  constructor(repository) {
    this.repository = repository
  }
  async getProducts(query=null, options=null) {
    try{
      return await this.repository.getProducts(query, options)
    }
    catch(error){
      throw error
    }
  }
  async getProductByID(id) {
    try{
      let product = await this.repository.getProductByID(id)
      if (!product) throw new NotFoundError('Product not found')
      return product
    }
    catch(error){
      throw error
    }
  }
  async getProductByCode(code) {
    try{
      let product = await this.repository.getProductByCode(code)
      if (!product) throw new NotFoundError('Product not found')
      return product
    }
    catch(error){
      throw error
    }
  }
  async createProduct(product) {
    try{
      // Checking if code isnt repeated
      const repeated = await this.getProductByCode(product.code)
      if (repeated) throw new InvalidDataError('Code already exists')
      product = new Product(
        product.title,
        product.description,
        product.code,
        product.price,
        product.stock,
        product.category,
        product.thumbnails,
        product.status
      )
      let saved = await this.repository.createProduct(product)
      return saved
    }
    catch(error){
      throw error
    }
  }
  async updateProduct(id, newPropierties) {
    try{
      if (newPropierties.code) {
        const repeated = await this.repository.getProductByCode(newPropierties.code)
        if (repeated) throw new InvalidDataError('Code already exists')
      }
      let product = await this.getProductByID(id)
      for (const prop in newPropierties) {
        if (prop === 'id') throw new InvalidDataError('ID cant be modified')
        if (!prop in product) throw new InvalidDataError('Invalid property')
      }
      // Checking if all data is valid.
      new Product(
        newPropierties.title ? newPropierties.title : product.title,
        newPropierties.description ? newPropierties.description : product.description,
        newPropierties.code ? newPropierties.code : product.code,
        newPropierties.price ? newPropierties.price : product.price,
        newPropierties.stock ? newPropierties.stock : product.stock,
        newPropierties.category ? newPropierties.category : product.category,
        newPropierties.thumbnails ? newPropierties.thumbnails : product.thumbnails,
        newPropierties.status ? newPropierties.status : product.status
      )
      return await this.repository.updateProduct(id, newPropierties)
    }
    catch(error){
      throw error
    }
  }
  async deleteProduct(id) {
    try{
      let product = await this.getProductByID(id)
      const deleted = await this.repository.deleteProduct(id)
      return product
    }
    catch(error){
      throw error
    }
  }
}

export const productsService = new ProductsService(productsRepository)