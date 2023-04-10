import express from 'express'

export const realTimeProductsView = express.Router()

realTimeProductsView.get('/', async (req, res) => {
  res.render('realTimeProducts', {})
})