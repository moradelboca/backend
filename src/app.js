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
import { sessionsRouter } from './routes/api/sessionsAPI.js'
import { usersRouter } from './routes/api/usersAPI.js'
import { loginView } from './routes/views/loginView.js'
import { registerView } from './routes/views/registerView.js'
import { onlyAuth } from './middlewares/auth.js'

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

//Handlebars view
app.use('/', homeView)
app.use('/products', onlyAuth, productsView)
app.use('/carts', onlyAuth, cartView)
app.use('/login', loginView)
app.use('/register', registerView)
// API views
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/api/sessions', sessionsRouter)
app.use('/api/users', usersRouter)


// Mongoose
await mongoose.connect(MONGO_URI)
mongoose.connection.useDb('ecommerce')