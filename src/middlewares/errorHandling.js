export function errorHandling(error, req, res, next) {
  switch (error.tipo) {
      case 'AUTH_ERROR':
          res.status(401)
          break
      case 'PERMISSION_ERROR':
          res.status(403)
          break
      default:
          res.status(500)
  }
  res.json({ errorMsg: error.message })
  next()
}