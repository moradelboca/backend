import passport from "passport"
import { Strategy as LocalStrategy } from 'passport-local'
import { usersModel } from "../models/UsersModel.js"
import { validateHash } from "../utils.js"

passport.use('local', new LocalStrategy({ usernameField: 'email' },
  async (_u, _p, done) => {
    let user = await usersModel.getByEmail(_u)
    if (!user) return done(null, false)
    if (!validateHash(_p, user.password)) return done(null, false)
    delete user.password
    return done(null, user)
  })
)

passport.serializeUser((user, next) => { next(null, user) })
passport.deserializeUser((user, next) => { next(null, user) })

export const passportInitialize = passport.initialize()
export const passportSession = passport.session()