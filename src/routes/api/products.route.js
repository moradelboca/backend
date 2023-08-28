import { Router } from 'express'
import { 
  handleAddOne, 
  handleDeleteOne,
  handleGetAll, 
  handleGetOne, 
  handleUpdateOne
} from '../../controllers/api/products.controller.js'
import { onlyAuth, onlyRole } from '../../middlewares/auth.js'

export const productsRouter = Router()

productsRouter.get('/', onlyAuth, handleGetAll)

productsRouter.get('/:pid', onlyAuth, handleGetOne)

productsRouter.post('/', onlyAuth, onlyRole('admin'), handleAddOne)

productsRouter.put('/:pid', onlyAuth, onlyRole('admin'), handleUpdateOne )

productsRouter.delete('/:pid', onlyAuth, onlyRole('admin'), handleDeleteOne)