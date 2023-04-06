import express from 'express'
import handlebars from 'express-handlebars'
import { cartsRouter } from './routes/cartsRouter.js'
import { cartsViewRouter } from './routes/cartsViewRouter.js'
import { productsRouter } from './routes/productsRouter.js'
import { productsViewRouter } from './routes/productsViewRouter.js'
import { Server } from 'socket.io'
import __dirname from './utils.js'

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

app.use('/api/products', productsRouter)
app.use('/home', productsViewRouter)
app.use('/api/carts', cartsRouter)
app.use('/carts', cartsViewRouter)

socketServer.on('connection', socket => {
  console.log('Cliente conectado')
  socket.on('message', data => {
    console.log(data)
  })
})