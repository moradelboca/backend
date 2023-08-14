import { productsService } from "../../services/products.service.js"

export async function handleGetAll(req, res, next) {
  try{
    const { limit=10, page=1, sort, category, status } = req.query
    // Defining filter parameters
    let query = {}
    if (category) {query.category = category}
    if (status) {query.status = status}
    // Searching page
    const paginateData = await productsService.getProducts(
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
      prevLink: paginateData.hasPrevPage ? `/?page=${prevPage}` : null,
      nextLink: paginateData.hasNextPage ? `/?page=${nextPage}` : null
    })
  }
  catch(error){
    next(error) 
  }
}

export async function handleGetOne(req, res, next) {
  try{
    const product = await productsService.getProductByID(req.params.pid)
    res.status(200).send({product: product})
  }
  catch(error){
    next(error)
  }
}

export async function handleAddOne(req, res, next) {
  try{
    let id = await productsService.createProduct( req.body )
    res.status(200).json({productId:id})
  }
  catch(error){
    next(error)
  }
}

export async function handleUpdateOne(req, res, next) {
  try{
    const updatedProduct = await productsService.updateProduct(req.params.pid, req.body)
    res.send({ updatedProduct: updatedProduct })
  }
  catch(error){
    next(error)
  }
}

export async function handleDeleteOne(req, res, next) {
  try{
    const deleted = await productsService.deleteProduct(req.params.pid)
    res.send({ deletedProduct: deleted })
  }
  catch(error){
    next(error)
  }
}