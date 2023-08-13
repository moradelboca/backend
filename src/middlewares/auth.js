import { AuthorizationError, AuthenticationError } from "../models/Errors.js"

export function onlyAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next()
  } else {
    throw new AuthenticationError()
  }
}

export function onlyRole(role){
  return function(req, res, next){
    if(req.user.role === role){
      next()
    }
    else{
      throw new AuthorizationError()
    }
  }
}