import express from 'express'
import handlebars from 'express-handlebars'
import { cartsRouter } from './routes/cartsAPI.js'
import { productsRouter } from './routes/productsAPI.js'
import { homeView } from './routes/homeView.js'
import __dirname from './utils.js'
import mongoose from 'mongoose'
import { productsView } from './routes/productsView.js'
import { cartView } from './routes/cartView.js'

// Express server
const app = express()
const PORT = process.env.PORT || 8080
const httpServer = app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`))

// Handlebars config
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')
app.use(express.static(__dirname + '/public'))

app.use(express.json())
app.use(express.urlencoded({ extended:true }))

//Handlebars view
app.use('/', homeView)
app.use('/products', productsView)
app.use('/carts', cartView)
// API views
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)

// Mongoose
const uri = 'mongodb+srv://moradelboca:s1OLfOOd5uZW4ovo@ecommerce.z6e0au4.mongodb.net/?retryWrites=true&w=majority'
await mongoose.connect(uri)
mongoose.connection.useDb('ecommerce')