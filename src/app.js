import express from 'express'
import handlebars from 'express-handlebars'
import { cartsRouter } from './routes/api/cartsAPI.js'
import { productsRouter } from './routes/api/productsAPI.js'
import { homeView } from './routes/views/homeView.js'
import { productsView } from './routes/views/productsView.js'
import { cartView } from './routes/views/cartView.js'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import { COOKIEPARSER_SECRET, SESSION_SECRET } from './config/server.config.js'
import MongoStore from 'connect-mongo'
import { MONGO_URI } from './config/mongodb.config.js'
import { usersRouter } from './routes/api/usersAPI.js'
import { loginView } from './routes/views/loginView.js'
import { registerView } from './routes/views/registerView.js'
import { onlyAuth } from './middlewares/auth.js'
import { passportInitialize, passportSession } from './middlewares/passport.js'
import { errorHandling } from './middlewares/errorHandling.js'

// Express server
export const app = express()

// Handlebars config
app.engine('handlebars', handlebars.engine())
app.set('views', './views')
app.set('view engine', 'handlebars')
app.use(express.static('./public'))

app.use(express.json())
app.use(express.urlencoded({ extended:true }))

// Cookie Parser
app.use(cookieParser(COOKIEPARSER_SECRET))

// Session
app.use(session({
  store: MongoStore.create({
    mongoUrl: MONGO_URI,
    mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
    ttl: 10 // 10 minutes
  }),
  secret: SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}))

// Passport
app.use(passportInitialize, passportSession)
//Handlebars view
app.use('/', homeView)
app.use('/products', onlyAuth, productsView)
app.use('/carts', onlyAuth, cartView)
app.use('/login', loginView)
app.use('/register', registerView)
// API views
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/api/users', usersRouter)
//Error handling
app.use(errorHandling)