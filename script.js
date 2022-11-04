// Modules
const express = require('express')
const multer = require('multer')
const { Router } = express
const Container = require('./classContainer')

const app = express()
const PORT = process.env.PORT || 8080
const productsRouter = Router()
const storage = multer.diskStorage({
  destination: function (req, file, cb) { cb(null, 'uploads') },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname +
        '-' +
        Date.now() +
        '.' +
        file.originalname.split('.').pop()
    )
  }
})
const upload = multer({ storage: storage })

const productsContainer = new Container('products', './products.txt')


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/public', express.static(__dirname + '/public'))
app.use('/api/products', productsRouter)

app.listen(PORT, () => { console.log(`App listening on port http://localhost:${PORT}`) })

productsRouter.get('/', async (req, res) => {
  const products = await productsContainer.getAll()
  res.json(products)
})
productsRouter.get('/:id', async (req, res) => {
  const { id } = req.params
  const products = await productsContainer.getAll()
  const product = products.find( product => product.id == id )
  res.json(product ? {success:true, product:product} : {success:false, msg:'Product wasn\'t found'})
})
productsRouter.post('/', async (req, res) => {
  const { body } = req
  if (body.hasOwnProperty('name') && body.hasOwnProperty('price') && body.hasOwnProperty('description') && body.hasOwnProperty('imageURL') && body.hasOwnProperty('category')){
    const id = await productsContainer.save(body)
    res.json(id ? {success:true, id:id} : {success:false, msg:'Product coundn\'t be added'})
  }
  else{
    res.json({success:false, msg:'Missing product atributes'})
  }
})
//

app.get('/', (req, res) => { res.sendFile(__dirname + '/index.html') })
app.get('/productoRandom', async (req, res) => {
  const randomNum = max => Math.floor(Math.random() * max)
  const products = await productsContainer.getAll()
  res.json(products[randomNum(products.length)])
})

