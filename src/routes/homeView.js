import express from 'express'
import { productsModel } from '../dao/models/ProductsModel.js'

export const homeView = express.Router()
   
homeView.get('/', async (req, res) => {
  const { limit=10, page=1, sort, category } = req.query
  const paginateData = await productsModel.getPage(
    category ? { category } : {},
    {
      limit,
      page,
      sort: { category:sort }
    }
  )
  console.log(paginateData)
  paginateData.showing = paginateData.docs.length 
  res.render('home', {context: paginateData})
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