import mongoose from 'mongoose'

const usuarioSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  age: { type: Number, required: true },
}, { versionKey: false })

class UsersModel {
  #usersDb
  constructor() {
    this.#usersDb = mongoose.model('users', usuarioSchema)
  }
  async createUser(userData) {
    let newUser = await this.#usersDb.create(userData)
    return newUser
  }
}

export const usersModel = new UsersModel()