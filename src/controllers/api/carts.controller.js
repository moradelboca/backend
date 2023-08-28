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

export async function handleDeleteProduct(req, res, next) {
  try{
    const newCart = await cartsService.deleteProduct(req.user.cart, req.params.pid)
    req.logger.debug(`Product ${req.params.pid} from cart ${newCart._id} was deleted`)
    res.status(200).json({updatedCart: newCart})
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