import express from 'express'
import handlebars from 'express-handlebars'
import { cartsRouter } from './routes/api/cartsAPI.js'
import { productsRouter } from './routes/api/productsAPI.js'
import { homeView } from './routes/views/homeView.js'
import __dirname from './utils.js'
import mongoose from 'mongoose'
import { productsView } from './routes/views/productsView.js'
import { cartView } from './routes/views/cartView.js'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import { COOKIEPARSER_SECRET, MONGO_URI, PORT, SESSION_SECRET } from './config/config.js'
import MongoStore from 'connect-mongo'

// Express server
const app = express()
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
// Cookie Parser
app.use(cookieParser(COOKIEPARSER_SECRET))
// Session
app.use(session({
  store: MongoStore.create({
    mongoUrl: MONGO_URI,
    mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
    ttl: 10 * 60 // 10 minutes
  }),
  secret: SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}))

// Mongoose
await mongoose.connect(MONGO_URI)
mongoose.connection.useDb('ecommerce')