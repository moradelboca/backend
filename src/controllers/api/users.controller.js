import {usersService} from "../../services/user.service.js"

export async function handleRegister(req, res, next) {
  try{
    const user = await usersService.createUser(req.body)
    req.logger.info(`User ${user.email} was created`)
    // Logging in user after registering.
    req.login(user, error => {
      if (error) {
        res.status(400).json({ errorMsg: error.message })
      } else {
        req.logger.info(`User ${user.email} was logged in`)
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
    req.logger.info(`User ${req.user.email} was logged in`)
    res.status(201).json(req.user)
  }
  catch(error){
    next(error)
  }
}

export async function handleGithubCallback(req, res, next) {
  try{
    req.logger.info(`User ${req.user.email} was logged in`)
    res.redirect('/')
  }
  catch(error){
    next(error)
  }
}

export async function handleLogout(req, res, next) {
  try{
    const user = req.user.email
    req.logout(err => {
      req.logger.info(`User ${user} was logged out`)
      res.status(200).json({msg: 'Logged out'})
    })
  }
  catch(error){
    next(error)
  }
}