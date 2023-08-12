import { cartsDao } from '../../daos/carts.dao.mongoose.js'

export async function handleGetOne(req, res, next) {
  try{
    let cartID = req.params.cid == 'mycart' ? req.user.cart : req.params.cid
    const cart = await cartsDao.getCartByID(cartID)
    res.status(200).send({cart: cart})
  }
  catch(error){
    next(error)
  }
}

export async function handleCreate(req, res, next) {
  try{
    const created = await cartsDao.createEmptyCart()
    res.status(201).json({created: created})
  }
  catch(error){
    next(error)
  }
}

export async function handleUpdate(req, res, next) {
  try{
    let cartID = req.params.cid == 'mycart' ? req.user.cart : req.params.cid
    const newCart = await cartsDao.updateCart(cartID, req.body)
    res.status(200).json({updatedCart: newCart})
  }
  catch(error){
    next(error)
  }
}

export async function handleUpdateOne(req, res, next) {
  try{
    let cartID = req.params.cid == 'mycart' ? req.user.cart : req.params.cid
    const newCart = await cartsDao.updateProduct(cartID, req.params.pid, req.body.quantity)
    res.status(200).json({updatedCart: newCart})
  }
  catch(error){
    next(error)
  }

}

export async function handleDeleteProduct(req, res, next) {
  try{
    let cartID = req.params.cid == 'mycart' ? req.user.cart : req.params.cid
    const newCart = await cartsDao.deleteProduct(cartID, req.params.pid)
    res.status(200).json({updatedCart: newCart})
  }
  catch(error){
    next(error)
  }
}

export async function handleDelete(req, res, next) {
  try{
    let cartID = req.params.cid == 'mycart' ? req.user.cart : req.params.cid
    const deleted = await cartsDao.deleteCart(cartID)
    res.status(200).json({deleted: deleted})
  }
  catch(error){
    next(error)
  }
}