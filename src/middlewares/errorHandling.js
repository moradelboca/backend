export function errorHandling(error, req, res, next) {
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
    default:
      res.status(500)
  }
  if (!error.viewError) {
    res.json({ errorMsg: error.message })
    next()
  }
}