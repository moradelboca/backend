import { Router } from 'express'
import {
  handleCreate,
  handleDelete,
  handleDeleteProduct,
  handleGetOne,
  handleUpdate,
  handleUpdateOne
} from '../../controllers/carts.controller.js'

export const cartsRouter = Router()

cartsRouter.post('/', handleCreate)

cartsRouter.get('/:cid', handleGetOne)

cartsRouter.put('/:cid', handleUpdate)

cartsRouter.delete('/:cid/products/:pid', handleDeleteProduct)

cartsRouter.delete('/:cid', handleDelete)

cartsRouter.put('/:cid/products/:pid', handleUpdateOne  )