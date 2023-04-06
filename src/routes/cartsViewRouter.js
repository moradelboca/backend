import { Router } from 'express'
import { CartsManager } from '../modules/CartsManager.js'

export const cartsViewRouter = Router()
const pm = new CartsManager('./static/carts.json')