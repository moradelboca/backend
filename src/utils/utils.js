import { fileURLToPath } from 'url'
import { dirname } from 'path'
import bcrypt from 'bcrypt'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default __dirname

export function hash(pass) {
  return bcrypt.hashSync(pass, bcrypt.genSaltSync(10))
}

export function validateHash(pass, storedHash) {
  return bcrypt.compareSync(pass, storedHash)
}