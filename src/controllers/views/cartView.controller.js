import { usersService } from "../../services/user.service.js"

export async function handleCartView(req, res, next) {
  try{
    const cart = await usersService.getCart(req.user.email)
    res.render('cart', {
      title: 'Carrito',
      cart: cart,
      productsInCart: !cart.products.length == 0,
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