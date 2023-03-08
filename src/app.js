import express from 'express'
import { ProductManager } from './ProductManager.js'

const app = express()
const PORT = process.env.PORT || 8080
app.use(express.urlencoded({extended:true}))

const pm = new ProductManager('./static/products.json')

app.get('/products', async (req, res) => {
  const products = await pm.getProducts()
  const { limit } = req.query
  if (!limit) {
    res.send(products)
  }else{
    res.send(products.slice(0, limit))
  }
})

app.get('/products/:pid', async (req, res) => {
  const product = await pm.getProductByID(req.params.pid)
  res.send(product || {Error:'Product wasnt found!'})
})

app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`) )
