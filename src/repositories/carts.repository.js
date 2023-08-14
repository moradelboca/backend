import { cartsDao } from '../daos/carts.dao.mongoose.js'

class CartsRepository {
  constructor(dao) {
    this.dao = dao
  }
  async getCarts (){
    return await this.dao.getCarts()
  }
  async createEmptyCart() {
    return await this.dao.createEmptyCart()
  }
  async getCartByID(id){
    return await this.dao.getCartByID(id)
  }
  async updateCart(id, products){
    return await this.dao.updateCart(id, products)
  }
  async deleteProduct(cartID, productID){
    return await this.dao.deleteProduct(cartID, productID)
  }
  async deleteCart(id){
    return await this.dao.deleteCart(id)
  }
  async updateProduct(cartID, productID, quantity){
    return await this.dao.updateProduct(cartID, productID, quantity)
  }
}

export const cartsRepository = new CartsRepository(cartsDao)
