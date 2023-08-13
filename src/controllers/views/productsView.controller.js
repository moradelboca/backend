import { productsDao } from '../../daos/products.dao.mongoose.js'

export async function handleProductsView(req, res, next) {
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
  }
  catch(error){
    res.render('products', {
      title: 'Productos - Error',
      docs: [],
      showingDocs: 0,
      totalDocs: 0,
      limit: 0,
      page: 0,
      hasPrevPage: false,
      hasNextPage: false,
      prevPage: 0,
      nextPage: 0,
      totalPages: 0
    })
    next(error)
  }
}

export async function handleProductView(req, res, next) {
  try{
    const { id } = req.params
    const product = await productsDao.getProductByID(id)
    res.render('product', {
      title: 'Producto',
      product: product,
      productExist: true
    })
  }
  catch(error){
    res.render('product', {
      title: 'Producto - Error',
      product: [],
      productExist: false
    })
    error.viewError = true
    next(error)
  }
}