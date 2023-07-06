import { Router } from 'express'
import { usersModel } from '../../models/UsersModel.js'

export const sessionsRouter = Router()

sessionsRouter.post('/', async (req, res, next) => {
  const user = await usersModel.getByEmail(req.body.email)
  if (!user) return res.sendStatus(401)
  if (user.password !== req.body.password) {
    return res.sendStatus(401)
  }
  req.session.user = {
    name: user.first_name + ' ' + user.last_name,
    email: user.email,
    age: user.age,
  }
  res.status(201).json(req.session.user)
})

sessionsRouter.delete('/', (req, res, next) => {
  req.session.destroy(err => {
    res.sendStatus(200)
  })
})