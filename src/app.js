import express from 'express'
import handlebars from 'express-handlebars'
import { cartsRouter } from './routes/cartsAPI.js'
import { realTimeProductsView } from './routes/realTimeProductsView.js'
import { productsRouter } from './routes/productsAPI.js'
import { homeView } from './routes/homeView.js'
import { Server } from 'socket.io'
import __dirname from './utils.js'
import { productsManager } from './dao/managers/ProductsManager.js' 
import mongoose from 'mongoose'
import { cartsModel } from './dao/models/CartsModel.js'

// Express server
const app = express()
const PORT = process.env.PORT || 8080
const httpServer = app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`))
// Sicket server
const socketServer = new Server(httpServer)

// Handlebars config
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')
app.use(express.static(__dirname + '/public'))

app.use(express.json())
app.use(express.urlencoded({ extended:true }))

app.use('/api/products', productsRouter)
app.use('/', homeView)
app.use('/api/carts', cartsRouter)
app.use('/realtimeproducts', realTimeProductsView)

// Mongoose
const uri = 'mongodb+srv://moradelboca:s1OLfOOd5uZW4ovo@ecommerce.z6e0au4.mongodb.net/?retryWrites=true&w=majority'
await mongoose.connect(uri)
mongoose.connection.useDb('ecommerce')

let products = []
socketServer.on('connection', async socket => {
  // New connections need to receive products.
  products = await productsManager.getProducts()
  socket.emit('productsList', products)
  console.log('Cliente conectado!')
  // Message to add a product to the list.
  socket.on('addProduct', async newProduct => {
    const { title, description, code, price, stock, category, thumbnails } = newProduct
    await productsManager.addProduct(title, description, code, price, stock, category, thumbnails)
    products = await productsManager.getProducts()
    socketServer.emit('productsList', products)
  })
})