import { Router } from 'express'
import { productsModel } from '../models/models/ProductsModel.js'

export const sessionsRouter = Router()

apiRouter.post('/usuarios', postUsuarios)

sessionsRouter.post('/sesiones', async (req, res, next) => {
  const usuarioEncontrado = await usuarioModel.findOne({ email: req.body.email }).lean()
  if (!usuarioEncontrado) return res.sendStatus(401)
  if (usuarioEncontrado.password !== req.body.password) {
    return res.sendStatus(401)
  }
  req.session.user = {
    name: usuarioEncontrado.first_name + ' ' + usuarioEncontrado.last_name,
    email: usuarioEncontrado.email,
    age: usuarioEncontrado.age,
  }
  res.status(201).json(req.session.user)
})

sessionsRouter.delete('/sesiones', (req, res, next) => {
  req.session.destroy(err => {
    res.sendStatus(200)
  })
})