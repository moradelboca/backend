import { Router } from 'express'
import passport from 'passport'
import { 
  handleGithubCallback,
  handleLogin,
  handleLogout,
  handleRegister
} from '../../controllers/api/users.controller.js'
import { passportAuthenticate, passportGithubAuthenticate } from '../../middlewares/passport.js'
import { onlyAuth, onlyRole } from '../../middlewares/auth.js'

export const usersRouter = Router()

usersRouter.post('/register', handleRegister)

usersRouter.post('/login', passportAuthenticate, handleLogin)

usersRouter.get('/github', passportGithubAuthenticate)

usersRouter.get('/githubcallback', passportGithubAuthenticate, handleGithubCallback)

usersRouter.post('/logout', onlyAuth, handleLogout)