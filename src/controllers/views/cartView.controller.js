import { cartsService } from "../../services/carts.service.js"

export async function handleCartView(req, res, next) {
  try{
    const cart = await cartsService.getCartByID(req.params.cid == 'mycart' ? req.user.cart : req.params.cid)
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
    next(error)
  }
}