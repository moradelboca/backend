import express from 'express'
import { cartsModel } from '../../models/CartsModel.js'

export const cartView = express.Router()

cartView.get('/:id', async (req, res) => {
  const { id } = req.params
  const cart = await cartsModel.getCartByID(id)
  res.render('cart', {
    title: 'Carrito',
    cart: cart,
    cartExist: cart ? true : false
  })
})