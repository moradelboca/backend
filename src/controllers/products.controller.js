import { productsDao } from "../daos/products.dao.mongoose.js"

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
    res.json({
      status: 'success',
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
  catch(e){
    res.json({status:'error', message:e})
  }
}

export async function handleGetOne(req, res, next) {
  const product = await productsDao.getProductByID(req.params.pid)
  res.send(product || {Error:'Product wasnt found!'})
}

export async function handleAddOne(req, res, next) {
  let id = await productsDao.addProduct( req.body )
  if (id != -1){
    res.json({status:'success', product:id})
  } else{
    res.json({status:'error'})
  }
}

export async function handleUpdateOne(req, res, next) {
  const updatedProduct = await productsDao.updateProduct(req.params.pid, req.body)
  res.send({ status: 'success', updatedProduct: updatedProduct })
}

export async function handleDeleteOne(req, res, next) {
const product = await productsDao.getProductByID(req.params.pid)
  if (product){
    const deleted = await productsDao.deleteProduct(req.params.pid)
    res.send({ status: 'success', deletedProduct: product })
    return
  }
  res.send({ status: 'error' })
}