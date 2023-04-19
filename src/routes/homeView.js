import express from 'express'
import { productsManager } from '../dao/managers/ProductsManager.js'

export const homeView = express.Router()

homeView.get('/', async (req, res) => {
  const products = await productsManager.getProducts()
  res.render('home', {products: products, noProducts: products.length == 0})
})