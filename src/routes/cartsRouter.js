import { Router } from 'express'
import { CartsManager } from '../CartsManager.js'

export const cartsRouter = Router()
const cm = new CartsManager('./static/carts.json')

cartsRouter.post('/', async (req, res) => {
  try{
    const id = await cm.addCart(req.body)
    res.json({status:'success', cartId: id})
  }
  catch(err){
    res.status(500).json({ message: err.message })
  }
})