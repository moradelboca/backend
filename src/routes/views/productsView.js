import express from 'express'
import { productsModel } from '../../models/ProductsModel.js'

export const productsView = express.Router()

productsView.get('/', async (req, res) => {
  const { limit=10, page=1, sort, category, status } = req.query
  // Defining filter parameters
  let query = {}
  if (category) {query.category = category}
  if (status) {query.status = status}
  // Searching page
  const paginateData = await productsModel.getPage(
    query,
    {
      limit,
      page,
      sort: { category:sort }
    }
  )
  res.render('products', {
    title: 'Productos',
    docs: paginateData.docs,
    showingDocs: paginateData.docs.length,
    totalDocs: paginateData.totalDocs,
    limit: limit,
    page: paginateData.page,
    hasPrevPage: paginateData.hasPrevPage,
    hasNextPage: paginateData.hasNextPage,
    prevPage: paginateData.prevPage,
    nextPage: paginateData.nextPage,
    totalPages: paginateData.totalPages
  })
})

productsView.get('/:id', async (req, res) => {
  const { id } = req.params
  const product = await productsModel.getProductByID(id)
  res.render('product', {
    title: 'Producto',
    product: product,
    productExist: product ? true : false
  })
})