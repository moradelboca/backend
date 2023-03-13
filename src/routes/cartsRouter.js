import { Router } from 'express'
import { ProductManager } from '../ProductManager.js'

export const cartsRouter = Router()
const pm = new ProductManager('./static/products.json')

cartsRouter.get('/', async (req, res) => {
  try{
  }
  catch(err){
    res.status(500).json({ message: err.message })
  }
})