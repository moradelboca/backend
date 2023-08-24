import { winstonLogger } from "../utils/logger.js"

export function logger(req, res, next){
  req.logger = winstonLogger
  req.logger.http(`${req.method} in ${req.url} from ${req.user ?  req.user.email : 'not auth user'}`)
  next()
}