import express from 'express'
import { cartsRouter } from './routes/cartsRouter.js'
import { productsRouter } from './routes/productsRouter.js'

const app = express()
const PORT = process.env.PORT || 8080
app.use(express.json())
app.use(express.urlencoded({ extended:true }))
app.use('/public', express.static('/public'))

app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)

app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`) )
