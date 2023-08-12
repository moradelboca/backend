import express from 'express'
import { handleProductsView, handleProductView } from '../../controllers/views/productsView.controller.js'

export const productsView = express.Router()

productsView.get('/', handleProductsView)

productsView.get('/:id', handleProductView)