import { User } from "../../models/Users.js"
import { cartsDao } from "../../daos/carts.dao.mongoose.js"
import { usersDao } from "../../daos/users.dao.mongoose.js"

export async function handleRegister(req, res, next) {
  try{
    const { email, password, first_name, last_name, age, role } = req.body
    const cart = await cartsDao.createEmptyCart()
    const user = new User(email, first_name, last_name, password, age, role, cart._id)
    await usersDao.createUser(user)
    delete user.password
    // Logging in user after registering.
    req.login(user, error => {
      if (error) {
        res.status(400).json({ errorMsg: error.message })
      } else {
        res.status(200).json(req.user)
      }
    })
  }
  catch(error){
    next(error)
  }
}

export async function handleLogin(req, res, next) {
  try{
    res.status(201).json(req.user)
  }
  catch(error){
    next(error)
  }
}

export async function handleGithubCallback(req, res, next) {
  try{
    res.redirect('/')
  }
  catch(error){
    next(error)
  }
}

export async function handleLogout(req, res, next) {
  req.logout(err => {
    res.status(200).json({msg: 'Logged out'})
  })
}