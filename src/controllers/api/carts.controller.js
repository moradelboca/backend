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
    req.logger.debug(`Cart ${created._id} was created`)
    res.status(201).json({created: created})
  }
  catch(error){
    next(error)
  }
}

export async function handleUpdate(req, res, next) {
  try{
    const newCart = await usersService.updateCart(req.user.email, req.body)
    req.logger.debug(`Cart ${newCart._id} was updated`)
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
    req.logger.debug(`Product ${req.params.pid} from cart ${newCart._id} was updated`)
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
    req.logger.debug(`Product ${req.params.pid} from cart ${newCart._id} was deleted`)
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
    const purchaseData = await usersService.purchaseCart(req.user.email)
    req.logger.info(`Cart ${purchaseData.ticket.code} was purchased by ${req.user.email}`)
    res.status(200).json({purchaseData: purchaseData})
  }
  catch(error){
    next(error)
  }
}