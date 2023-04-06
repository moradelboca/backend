import express from 'express'
import { ProductManager } from '../modules/ProductManager.js'

export const productsViewRouter = express.Router()
const pm = new ProductManager('./static/products.json')

productsViewRouter.get('/', async (req, res) => {
  const products = await pm.getProducts()
  res.render('home', {products: products, noProducts: products.length == 0})
})