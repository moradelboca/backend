import { usersDao } from '../daos/users.dao.mongoose.js'
import { hash } from '../utils.js'

export async function handleRegister(req, res, next) {
  const { email, password, first_name, last_name, age } = req.body
  const user = {
    email, 
    password: hash(password),
    first_name,
    last_name, 
    age 
  }
  await usersDao.createUser(user)
  // Logging in user after registering.
  req.login(user, error => {
    if (error) {
      next(new Error('falló el login!'))
    } else {
      res.status(201).json(req.user)
    }
  })
}

export async function handleLogin(req, res, next) {
  res.status(201).json({ status: 'success' })
}

export async function handleGithubCallback(req, res, next) {
  res.redirect('/')
}

export async function handleLogout(req, res, next) {
  req.logout(err => {
    res.sendStatus(200)
  })
}