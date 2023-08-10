import express from 'express'
import { cartsDao } from '../../daos/carts.dao.mongoose.js'

export const cartView = express.Router()

cartView.get('/:id', async (req, res) => {
  const { id } = req.params
  const cart = await cartsDao.getCartByID(id)
  res.render('cart', {
    title: 'Carrito',
    cart: cart,
    cartExist: cart ? true : false
  })
})