import mongoose from 'mongoose'

const usuarioSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  age: { type: Number, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user'}
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
  async getByEmail(email) {
    try{
      let user = await this.#usersDb.findOne({ email })
      return user
    }
    catch(error){
      console.log(error)
    }
  }
  async promoteToAdmin(email) {
    try{
      let user = await this.getByEmail(email)
      user.role = 'admin'
      await user.save()
      return user
    }
    catch(error){
      console.log(error)
    }
  }
}

export const usersModel = new UsersModel()