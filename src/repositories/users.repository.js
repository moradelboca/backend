import { usersDao } from '../daos/users.dao.mongoose.js'

class UsersRepository {
  constructor(dao) {
    this.dao = dao
  }
  async createUser(user) {
    return await this.dao.createUser(user)
  }
  async getByEmail(email) {
    return await this.dao.getByEmail(email)
  }
  async promoteToAdmin(email) {
    return await this.dao.promoteToAdmin(email)
  }
}

export const usersRepository = new UsersRepository(usersDao)