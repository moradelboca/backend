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
      return await this.repository.getByEmail(email)
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
}

export const usersService = new UsersService(usersRepository)