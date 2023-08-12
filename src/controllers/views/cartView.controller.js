import { cartsDao } from "../../daos/carts.dao.mongoose.js"

export async function handleCartView(req, res, next) {
  try{
    const cart = await cartsDao.getCartByID(req.params.cid == 'mycart' ? req.user.cart : req.params.cid)
    res.render('cart', {
      title: 'Carrito',
      cart: cart,
      cartExist: true
    })
  }
  catch(error){
    res.render('cart', {
      title: 'Carrito - Error',
      cart: [],
      cartExist: false
    })
    error.viewError = true
    next(error)
  }
}