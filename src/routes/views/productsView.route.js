import express from 'express'
import { handleProductsView, handleProductView } from '../../controllers/views/productsView.controller.js'
import { onlyAuth } from '../../middlewares/auth.js'

export const productsView = express.Router()

productsView.get('/', onlyAuth, handleProductsView)

productsView.get('/:id', onlyAuth, handleProductView)