import { Router } from 'express'
import {
  handleDeleteProduct,
  handleGetOne,
  handleUpdate,
  handlePurchase
} from '../../controllers/api/carts.controller.js'
import { onlyAuth, onlyRole } from '../../middlewares/auth.js'

export const cartsRouter = Router()

cartsRouter.get('/mycart', onlyAuth, handleGetOne)

cartsRouter.put('/mycart', onlyAuth, handleUpdate)

cartsRouter.delete('/mycart/products/:pid', onlyAuth, handleDeleteProduct)

cartsRouter.post('/mycart/purchase', onlyAuth, handlePurchase)