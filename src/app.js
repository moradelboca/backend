import express from 'express'
import handlebars from 'express-handlebars'
import { cartsRouter } from './routes/cartsRouter.js'
import { productsRouter } from './routes/productsRouter.js'

const app = express()
app.engine('handlebars', handlebars.engine())
app.set('views', './src/views')
app.set('view engine', 'handlebars')
app.use('/public', express.static('/public'))

app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)

const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`) )

app.get('/', (req, res) => {
  res.render('index', {name:'Jose'})
})