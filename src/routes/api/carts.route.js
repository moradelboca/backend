import { Router } from 'express'
import {
  handleCreate,
  handleDelete,
  handleDeleteProduct,
  handleGetOne,
  handleUpdate,
  handleUpdateOne,
  handlePurchase
} from '../../controllers/api/carts.controller.js'
import { onlyAuth, onlyRole } from '../../middlewares/auth.js'

export const cartsRouter = Router()

cartsRouter.post('/', onlyAuth, handleCreate)

cartsRouter.get('/mycart', onlyAuth, handleGetOne)

cartsRouter.put('/mycart', onlyAuth, handleUpdate)

cartsRouter.delete('/:cid/products/:pid', onlyAuth, handleDeleteProduct)

cartsRouter.delete('/:cid', onlyAuth, onlyRole('admin'), handleDelete)

cartsRouter.put('/:cid/products/:pid', onlyAuth, handleUpdateOne)

cartsRouter.post('/:cid/purchase', onlyAuth, handlePurchase)