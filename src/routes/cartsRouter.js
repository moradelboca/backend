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

cartsRouter.get('/:cid', async (req, res) => {
  try{
    const cart = await cm.getCartByID(req.params.cid)
    if(!cart){
      res.status(404).json({ message: 'ID not found' })
      return
    }
    res.json(cart)
  }
  catch(err){
    res.status(500).json({ message: err.message })
  }
})