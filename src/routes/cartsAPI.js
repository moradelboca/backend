import { Router } from 'express'
import { cartsModel } from '../dao/models/CartsModel.js'

export const cartsRouter = Router()

cartsRouter.post('/', async (req, res) => {
  const added = await cartsModel.addCart(req.body)
  res.json({status:'success', cartId: added._id})
})

cartsRouter.get('/:cid', async (req, res) => {
  const cart = await cartsModel.getCartByID(req.params.cid)
  if(!cart){
    return res.status(404).json({ status:'error', message: 'ID not found' })
  }
  res.json(cart)
})

cartsRouter.put('/:pid', async (req, res) => {
  const newCart = await cartsModel.updateCart(req.params.pid, req.body)
  if(newCart != -1){ res.json({status:'success', updatedCart: newCart}) }
  else{ res.status(404).json({ status:'error', message: 'Cart was not found' }) }
})

/*

// Code for FileSystem
import { Router } from 'express'
import { cartsManager } from '../dao/managers/CartsManager.js'

export const cartsRouter = Router()

cartsRouter.post('/', async (req, res) => {
  try{
    const id = await cartsManager.addCart(req.body)
    res.json({status:'success', cartId: id})
  }
  catch(err){
    res.status(500).json({ message: err.message })
  }
})

cartsRouter.get('/:cid', async (req, res) => {
  try{
    const cart = await cartsManager.getCartByID(req.params.cid)
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

cartsRouter.put('/:pid', async (req, res) => {
  try{
    const id = await cartsManager.updateCart(req.params.pid, req.body)
    if(id != -1){ res.json({status:'success', cartId: id}) }
    else{ res.status(404).json({ message: 'Cart was not found' }) }
  }
  catch(err){
    res.status(500).json({ message: err.message })
  }
})

*/