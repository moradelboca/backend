import express from 'express'
import { handleCartView } from '../../controllers/views/cartView.controller.js'

export const cartView = express.Router()

cartView.get('/:cid', handleCartView)