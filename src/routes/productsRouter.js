import { Router } from 'express'
import { ProductManager } from '../ProductManager.js'

export const productsRouter = Router()
const pm = new ProductManager('./static/products.json')

productsRouter.get('/', async (req, res) => {
  try{
    const products = await pm.getProducts()
    const { limit } = req.query
    if (!limit) {
      res.send(products)
    }else{
      res.send(products.slice(0, limit))
    }
  }
  catch(err){
    res.status(500).json({ message: err.message })
  }
})

productsRouter.get('/:pid', async (req, res) => {
  try{
    const product = await pm.getProductByID(req.params.pid)
    res.send(product || {Error:'Product wasnt found!'})
  }
  catch(err){
    res.status(500).json({ message: err.message })
  }
})

productsRouter.post('/', async (req, res) => {
  const { title, description, code, price, stock, category, thumbnails } = req.body
  try{
    let id = await pm.addProduct( title, description, code, price, stock, category, thumbnails )
    if (id != -1){
      res.json({status:'success', id:id})
    } else{
      // Need to check how to throw this error, just to avoid using ifs!
      res.status(500).json({ message:'Product is repeated!'})
    }
  }
  catch(err){
    res.status(500).json({ message: err.message })
  }
})

productsRouter.put('/:pid', async (req, res) => {
  try{
    const updatedProduct = await pm.updateProduct(req.params.pid, req.body)
    res.send({ status: 'success', updatedProduct: updatedProduct })
  }
  catch{
    res.status(500).json({ message: err.message })
  }
})

productsRouter.delete('/:pid', async (req, res) => {
  try{
    const product = await pm.getProductByID(req.params.pid)
    const deleted = await pm.deleteProduct(req.params.pid)
    res.send({ status: 'success', deletedProduct: product })
  }
  catch{
    res.status(500).json({ message: err.message })
  }
})