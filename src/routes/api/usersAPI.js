import { Router } from 'express'
import { usersModel } from '../../models/UsersModel.js'

export const usersRouter = Router()

usersRouter.post('/', async (req, res) => {

  const user = await usersModel.createUser(req.body)

  req.session.user = {
    name: user.first_name + ' ' + user.last_name,
    email: user.email,
    age: user.age,
  }

  res.status(201).json(user)
})