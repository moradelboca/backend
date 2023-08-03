import { Router } from 'express'
import passport from 'passport'
import { hash } from '../../utils.js'
import { usersModel } from '../../models/UsersModel.js'

export const usersRouter = Router()

usersRouter.post('/register', async (req, res) => {
  const { email, password, first_name, last_name, age } = req.body
  const user = {
    email, 
    password: hash(password),
    first_name,
    last_name, 
    age 
  }
  await usersModel.createUser(user)
  
  // Logging in user after registering.
  req.login(user, error => {
    if (error) {
      next(new Error('falló el login!'))
    } else {
      res.status(201).json(req.user)
    }
  })
  console.log(req.isAuthenticated())
})

usersRouter.post('/login', passport.authenticate('local'), async (req, res) => {
  res.status(201).json({ user: req.user })
})

usersRouter.post('/logout', async (req, res) => {
  req.logout()
  res.status(200).json({ msg: 'Logged out' })
})