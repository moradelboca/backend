import { Router } from 'express'
import passport from 'passport'
import { 
  handleGithubCallback,
  handleLogin,
  handleLogout,
  handleRegister
} from '../../controllers/users.controller.js'

export const usersRouter = Router()

usersRouter.post('/register', handleRegister)

usersRouter.post('/login', passport.authenticate('local'), handleLogin)

usersRouter.get('/github', passport.authenticate('github'))

usersRouter.get('/githubcallback', passport.authenticate('github'), handleGithubCallback)

usersRouter.post('/logout', handleLogout)