import { cartsDao } from '../daos/carts.dao.mongoose.js'

export async function handleGetOne(req, res, next) {
  const cart = await cartsDao.getCartByID(req.params.cid)
  if(!cart){
    return res.status(404).json({ status:'error', message: 'ID not found' })
  }
  res.json(cart)
}

export async function handleCreate(req, res, next) {
  const added = await cartsDao.createCart()
  res.json({status:'success', cartId: added._id})
}

export async function handleUpdate(req, res, next) {
  const newCart = await cartsDao.updateCart(req.params.cid, req.body)
  if(newCart != -1){ res.json({status:'success', updatedCart: newCart}) }
  else{ res.status(404).json({ status:'error', message: 'Cart was not found' }) }
}

export async function handleUpdateOne(req, res, next) {
  try{
    const newCart = await cartsDao.updateProduct(req.params.cid, req.params.pid)
    if(newCart != -1){ res.json({status:'success', updatedCart: newCart}) }
    else{ res.status(404).json({ status:'error', message: 'Cart was not found' }) }
  }
  catch(e){
    res.json({status:'error', message:e})
  }
}

export async function handleDeleteProduct(req, res, next) {
  try{
    const newCart = await cartsDao.deleteProduct(req.params.cid, req.params.pid)
    res.json(newCart)
  }
  catch(e){
    res.json({status:'error', message:e})
  }
}

export async function handleDelete(req, res, next) {
  try{
    const deleted = await cartsDao.deleteCart(req.params.cid)
    res.json(deleted)
  }
  catch(e){
    res.json({status:'error', message:e})
  }
}