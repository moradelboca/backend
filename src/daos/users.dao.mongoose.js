import mongoose from '../database/mongoose.js'
import { NotFoundError } from '../models/Errors.js'

const usersSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  age: { type: Number, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user'},
  cart: { type: mongoose.Schema.Types.ObjectId, ref: 'carts'}
}, { versionKey: false })

class UsersDaoMongoose {
  #usersDb
  constructor() {
    this.#usersDb = mongoose.model('users', usersSchema)
  }
  async createUser(user) {
    try{
      let newUser = await this.#usersDb.create(user)
      return newUser
    }
    catch(error){
      throw error
    }
  }
  async getByEmail(email) {
    try{
      let user = await this.#usersDb.findOne({ email })
      if (!user) throw new NotFoundError('User not found')
      return user
    }
    catch(error){
      throw error
    }
  }
  async promoteToAdmin(email) {
    try{
      let user = await this.#usersDb.findOne({ email })
      if (!user) throw new NotFoundError('User not found')
      user.role = 'admin'
      await user.save()
      return user
    }
    catch(error){
      throw error
    }
  }
}

export const usersDao = new UsersDaoMongoose()