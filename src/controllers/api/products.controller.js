import { productsDao } from "../../daos/products.dao.mongoose.js"
import { Product } from "../../models/Products.js"

export async function handleGetAll(req, res, next) {
  try{
    const { limit=10, page=1, sort, category, status } = req.query
    // Defining filter parameters
    let query = {}
    if (category) {query.category = category}
    if (status) {query.status = status}
    // Searching page
    const paginateData = await productsDao.getPage(
      query,
      {
        limit,
        page,
        sort: { category:sort }
      }
    )
    res.status(200).json({
      payload: paginateData.docs.slice(0, limit),
      totalPages: paginateData.totalPages,
      hasPrevPage: paginateData.hasPrevPage,
      hasNextPage: paginateData.hasNextPage,
      prevPage: paginateData.prevPage,
      nextPage: paginateData.nextPage,
      prevLink: paginateData.hasPrevPage ? `/?page=${prevPage + 1}` : null,
      nextLink: paginateData.hasNextPage ? `/?page=${nextPage + 1}` : null
    })
  }
  catch(error){
    next(error) 
  }
}

export async function handleGetOne(req, res, next) {
  try{
    const product = await productsDao.getProductByID(req.params.pid)
    res.status(200).send({product: product})
  }
  catch(error){
    next(error)
  }
}

export async function handleAddOne(req, res, next) {
  const { title, description, code, price, stock, category, thumbnails=[], status=true } = req.body
  try{
    const newProduct = new Product(title, description, code, price, stock, category, thumbnails, status)
    let id = await productsDao.addProduct( newProduct )
    res.status(200).json({productId:id})
  }
  catch(error){
    next(error)
  }
}

export async function handleUpdateOne(req, res, next) {
  try{
    const updatedProduct = await productsDao.updateProduct(req.params.pid, req.body)
    res.send({ updatedProduct: updatedProduct })
  }
  catch(error){
    next(error)
  }
}

export async function handleDeleteOne(req, res, next) {
  try{
    const deleted = await productsDao.deleteProduct(req.params.pid)
    res.send({ deletedProduct: deleted })
  }
  catch(error){
    next(error)
  }
}