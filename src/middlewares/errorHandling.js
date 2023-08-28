function errorHandlingApi(error, req, res, next) {
  switch (error.type) {
    case 'AUTHORIZATION_ERROR':
      res.status(403)
      break
    case 'AUTHENTICATION_ERROR':
      res.status(401)
      break
    case 'NOT_FOUND_ERROR':
      res.status(404)
      break
    case 'INVALID_DATA_ERROR':
      res.status(400)
      break
    default:
      res.status(500)
  }
  req.logger.error(`${error.message} from ${req.user ? req.user.email : 'not auth user'}`)
  res.json({ errorMsg: error.message })
  next()
}

function errorHandlingView(error, req, res, next) {
  switch (error.type) {
    case 'AUTHORIZATION_ERROR':
      res.redirect('/unauthorized')
      break
    case 'AUTHENTICATION_ERROR':
      res.redirect('/auth/login')
      break
    case 'NOT_FOUND_ERROR':
      res.status(404)
      break
    case 'INVALID_DATA_ERROR':
      res.status(400)
      break
    default:
      res.status(500)
  }
  req.logger.error(`${error.message} from ${req.user ? req.user.email : 'not auth user'} - View error`)
}

export function errorHandling(error, req, res, next) {
  // Check if the error is from a view or an API.
  if(req.url.startsWith('/api')){
    errorHandlingApi(error, req, res, next)
  }
  else{
    errorHandlingView(error, req, res, next)
  }
}