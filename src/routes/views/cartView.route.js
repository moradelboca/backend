import express from 'express'
import { handleCartView } from '../../controllers/views/cartView.controller.js'
import { onlyAuth } from '../../middlewares/auth.js'

export const cartView = express.Router()

cartView.get('/:cid', onlyAuth, handleCartView)