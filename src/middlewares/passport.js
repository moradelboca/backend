import passport from "passport"
import { Strategy as LocalStrategy } from 'passport-local'
import { usersDao } from '../daos/users.dao.mongoose.js'
import { validateHash, hash } from "../utils.js"
import { Strategy as GithubStrategy } from 'passport-github2'
import { GH_CLIENTID, GH_CLIENTSECRET } from "../config/githubsession.config.js"
import { AuthenticationError, NotFoundError } from "../models/Errors.js"
import { User } from "../models/Users.js"
import { cartsDao } from "../daos/carts.dao.mongoose.js"

passport.use('local', new LocalStrategy({ usernameField: 'email' },
  async (username, password, done) => {
    try{
      let user = await usersDao.getByEmail(username)
      if (!user) return done(new AuthenticationError(), false)
      if (!validateHash(password, user.password)) return done(new AuthenticationError('Incorrect password'), false)
      delete user.password
      done(null, user)
    }
    catch(error){
      if (error.type == 'NOT_FOUND_ERROR') return done(new AuthenticationError('User not found'), false)
      done(error, false)
    }
  })
)

passport.use('github', new GithubStrategy({
  clientID: GH_CLIENTID,
  clientSecret: GH_CLIENTSECRET,
  callbackURL: 'http://localhost:8080/api/users/githubcallback'
  }, async (accessToken, refreshToken, profile, done) => {
    let user
    try{
      user = await usersDao.getByEmail(profile._json.email)
      done(null, user)
    }
    catch(error){
      if (error.type == 'NOT_FOUND_ERROR') {
        const cart = await cartsDao.createEmptyCart()
        user = new User(
          profile._json.email,
          profile._json.name,
          profile._json.name,
          hash(profile._json.node_id),
          18,
          'user',
          cart._id
        )
        await usersDao.createUser(user)
        delete user.password
        done(null, user)
      }
      done(error, false)
    }
    if (!user) {
      user = await usersDao.createUser({
        email: profile._json.email,
        password: hash(profile._json.node_id),
        first_name: profile._json.name,
        last_name: profile._json.name,
        age: 18
      })  
    }
  }
))

passport.serializeUser((user, next) => { next(null, user) })
passport.deserializeUser((user, next) => { next(null, user) })

export const passportInitialize = passport.initialize()
export const passportSession = passport.session()

export const passportAuthenticate = passport.authenticate('local', { failWithError: true })
export const passportGithubAuthenticate = passport.authenticate('github', { failWithError: true })