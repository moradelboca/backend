import { Router } from 'express'
import {
  handleCreate,
  handleDelete,
  handleDeleteProduct,
  handleGetOne,
  handleUpdate,
  handleUpdateOne
} from '../../controllers/api/carts.controller.js'
import { onlyAuth, onlyRole } from '../../middlewares/auth.js'

export const cartsRouter = Router()

cartsRouter.post('/', onlyAuth, handleCreate)

cartsRouter.get('/:cid', onlyAuth, handleGetOne)

cartsRouter.put('/:cid', onlyAuth, handleUpdate)

cartsRouter.delete('/:cid/products/:pid', onlyAuth, handleDeleteProduct)

cartsRouter.delete('/:cid', onlyAuth, onlyRole('admin'), handleDelete)

cartsRouter.put('/:cid/products/:pid', handleUpdateOne)