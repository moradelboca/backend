import express from 'express'
import { productsModel } from '../dao/models/ProductsModel.js'

export const homeView = express.Router()

homeView.get('/', async (req, res) => {
  const { limit, page, sort, query } = req.query
  const paginateData = await productsModel.getPage(
    {},
    {
      limit: limit ?? 10,
      page: page ?? 1
    }
  )
  res.render('home', {paginateData: paginateData, noProducts: paginateData.docs.length == 0})
})

/*

// Code for FileSystem

import express from 'express'
import { productsManager } from '../dao/managers/ProductsManager.js'

export const homeView = express.Router()

homeView.get('/', async (req, res) => {
  const products = await productsManager.getProducts()
  res.render('home', {products: products, noProducts: products.length == 0})
})

*/