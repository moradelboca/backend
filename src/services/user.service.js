import { NotFoundError } from '../models/Errors.js'
import { usersRepository } from '../repositories/users.repository.js'
import { User } from '../models/Users.js'
import { cartsService } from './carts.service.js'

class UsersService{
  constructor(repository) {
    this.repository = repository
  }
  async createUser(user) {
    try{
      const userExists = await this.repository.getByEmail(user.email)
      if (userExists) throw new NotFoundError('User already exists')
      const cart = await cartsService.createEmptyCart()
      user = new User(
        user.email,
        user.password,
        user.first_name,
        user.last_name,
        user.age,
        user.role,
        cart._id
      )
      return await this.repository.createUser(user)
    }
    catch(error){
      throw error
    }
  }
  async getByEmail(email) {
    try{
      const user = await this.repository.getByEmail(email)
      if (!user) throw new NotFoundError('User wasnt found.')
      return user
    }
    catch(error){
      throw error
    }
  }
  async promoteToAdmin(email) {
    try{
      let user = await this.repository.getByEmail(email)
      if (!user) throw new NotFoundError('User wasnt found.')
      if (user.role === 'admin') throw new Error('User is already an admin.')
      return await this.repository.promoteToAdmin(email)
    }
    catch(error){
      throw error
    }
  }
  async getCart(email) {
    try{
      let user = await this.getByEmail(email)
      return await cartsService.getCartByID(user.cart)
    }
    catch(error){
      throw error
    }
  }
  async purchaseCart(email) {
    try{
      let user = await this.getByEmail(email)
      const a = await cartsService.purchaseCart(user.cart, email)
      return await cartsService.purchaseCart(user.cart, email)
    }
    catch(error){
      throw error
    }
  }
  async updateCart(email, products) {
    try{
      let user = await this.getByEmail(email)
      return await cartsService.updateCart(user.cart, products)
    }
    catch(error){
      throw error
    }
  }
}

export const usersService = new UsersService(usersRepository)