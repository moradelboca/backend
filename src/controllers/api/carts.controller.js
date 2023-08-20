import { cartsService } from '../../services/carts.service.js'
import { usersService } from '../../services/user.service.js'

export async function handleGetOne(req, res, next) {
  try{
    const cart = await usersService.getCart(req.user.email)
    res.status(200).send({cart: cart})
  }
  catch(error){
    next(error)
  }
}

export async function handleCreate(req, res, next) {
  try{
    const created = await cartsService.createEmptyCart()
    res.status(201).json({created: created})
  }
  catch(error){
    next(error)
  }
}

export async function handleUpdate(req, res, next) {
  try{
    const newCart = await usersService.updateCart(req.user.email, req.body)
    res.status(200).json({updatedCart: newCart})
  }
  catch(error){
    next(error)
  }
}

export async function handleUpdateOne(req, res, next) {
  try{
    let cartID = req.params.cid == 'mycart' ? req.user.cart : req.params.cid
    const newCart = await cartsService.updateProduct(cartID, req.params.pid, req.body.quantity)
    res.status(200).json({updatedCart: newCart})
  }
  catch(error){
    next(error)
  }

}

export async function handleDeleteProduct(req, res, next) {
  try{
    let cartID = req.params.cid == 'mycart' ? req.user.cart : req.params.cid
    const newCart = await cartsService.deleteProduct(cartID, req.params.pid)
    res.status(200).json({updatedCart: newCart})
  }
  catch(error){
    next(error)
  }
}

export async function handleDelete(req, res, next) {
  try{
    let cartID = req.params.cid == 'mycart' ? req.user.cart : req.params.cid
    const deleted = await cartsService.deleteCart(cartID)
    res.status(200).json({deleted: deleted})
  }
  catch(error){
    next(error)
  }
}

export async function handlePurchase(req, res, next) {
  try{
    const purchase = await usersService.purchaseCart(req.user.email)
    res.status(200).json({ticket: purchase})
  }
  catch(error){
    next(error)
  }
}