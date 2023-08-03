import passport from "passport"
import { Strategy as LocalStrategy } from 'passport-local'
import { usersModel } from "../models/UsersModel.js"
import { validateHash, hash } from "../utils.js"
import { Strategy as GithubStrategy } from 'passport-github2'
import { GH_CLIENTID, GH_CLIENTSECRET } from "../config/config.js"

passport.use('local', new LocalStrategy({ usernameField: 'email' },
  async (_u, _p, done) => {
    let user = await usersModel.getByEmail(_u)
    if (!user) return done(null, false)
    if (!validateHash(_p, user.password)) return done(null, false)
    delete user.password
    return done(null, user)
  })
)

passport.use('github', new GithubStrategy({
  clientID: GH_CLIENTID,
  clientSecret: GH_CLIENTSECRET,
  callbackURL: 'http://localhost:8080/api/users/githubcallback'
  }, async (accessToken, refreshToken, profile, done) => {
    let user = await usersModel.getByEmail(profile._json.email)
    if (!user) {
      user = await usersModel.createUser({
        email: profile._json.email,
        password: hash(profile._json.node_id),
        first_name: profile._json.name,
        last_name: profile._json.name,
        age: 18
      })  
    }
    done(null, user)
  }
))

passport.serializeUser((user, next) => { next(null, user) })
passport.deserializeUser((user, next) => { next(null, user) })

export const passportInitialize = passport.initialize()
export const passportSession = passport.session()