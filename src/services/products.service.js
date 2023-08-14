import { NotFoundError } from '../models/Errors.js'
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
      let product = await this.repository.findByCode(code)
      if (!product) throw new NotFoundError('Product not found')
      return product
    }
    catch(error){
      throw error
    }
  }
  async createProduct(product) {
    try{
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
      // Checking if code isnt repeated
      const repeated = await this.getProductByCode(product.code)
      if (repeated) throw new Error('Code already exists')
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
        if (repeated) throw new Error('Code already exists')
      }
      let product = await this.getProductByID(id)
      if (!product) throw new NotFoundError('Product not found')
      for (const prop in newPropierties) {
        if (prop == 'id') throw new Error('ID cant be modified')
        if (!prop in product) throw new Error('Invalid property')
      }
      const updated = await this.repository.updateProduct(id, newPropierties)
      return product
    }
    catch(error){
      throw error
    }
  }
  async deleteProduct(id) {
    try{
      let product = await this.getProductByID(id)
      if (!product) throw new NotFoundError('Product not found')
      const deleted = await this.repository.deleteProduct(id)
      return product
    }
    catch(error){
      throw error
    }
  }
}

export const productsService = new ProductsService(productsRepository)