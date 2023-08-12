import { Router } from 'express'
import { 
  handleAddOne, 
  handleDeleteOne,
  handleGetAll, 
  handleGetOne, 
  handleUpdateOne
} from '../../controllers/api/products.controller.js'

export const productsRouter = Router()

productsRouter.get('/', handleGetAll)

productsRouter.get('/:pid', handleGetOne)

productsRouter.post('/', handleAddOne)

productsRouter.put('/:pid', handleUpdateOne )

productsRouter.delete('/:pid', handleDeleteOne)