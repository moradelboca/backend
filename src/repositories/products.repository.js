import { productsDao } from '../daos/products.dao.mongoose.js'

class ProductsRepository{
  constructor(dao) {
    this.dao = dao
  }
  async getProducts(query=null, options=null) {
    return await this.dao.getProducts(query, options)
  }
  async getProductByID(id) {
    return await this.dao.getProductByID(id)
  }
  async getProductByCode(code) {
    return await this.dao.findByCode(code)
  }
  async createProduct(product) {
    return await this.dao.createProduct(product)
  }
  async updateProduct(id, newPropierties) {
    return await this.dao.updateProduct(id, newPropierties)
  }
  async deleteProduct(id) {
    return await this.dao.deleteProduct(id)
  }
}


export const productsRepository = new ProductsRepository(productsDao)