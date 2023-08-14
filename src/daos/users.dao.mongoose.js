import mongoose from '../database/mongoose.js'

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
    return await this.#usersDb.create(user)
  }
  async getByEmail(email) {
    return await this.#usersDb.findOne({ email })
  }
  async promoteToAdmin(email) {
    let user = await this.#usersDb.findOne({ email })
    user.role = 'admin'
    await user.save()
    return user
  }
}

export const usersDao = new UsersDaoMongoose()