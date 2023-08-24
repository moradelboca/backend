import passport from "passport"
import { Strategy as LocalStrategy } from 'passport-local'
import { validateHash, hash } from "../utils/utils.js"
import { Strategy as GithubStrategy } from 'passport-github2'
import { GH_CLIENTID, GH_CLIENTSECRET } from "../config/githubsession.config.js"
import { AuthenticationError } from "../models/Errors.js"
import { usersService } from "../services/user.service.js";

passport.use('local', new LocalStrategy({ usernameField: 'email' },
  async (username, password, done) => {
    try{
      let user = await usersService.getByEmail(username)
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
      user = await usersService.getByEmail(profile._json.email)
      done(null, user)
    }
    catch(error) {
      if (error.type == 'NOT_FOUND_ERROR') {
        try{
          const userData = {
            email: profile._json.email,
            last_name: profile._json.name,
            first_name: profile._json.name,
            password: hash(profile._json.node_id),
            age: 18,
            role: 'user'
          }
          const user = await usersService.createUser(userData)
          delete user.password
          done(null, user)
        }
        catch (error) {
          done(error, false)
        }
      }
    }
  }
))

passport.serializeUser((user, next) => { next(null, user) })
passport.deserializeUser((user, next) => { next(null, user) })

export const passportInitialize = passport.initialize()
export const passportSession = passport.session()

export const passportAuthenticate = passport.authenticate('local', { failWithError: true })
export const passportGithubAuthenticate = passport.authenticate('github', { failWithError: true })