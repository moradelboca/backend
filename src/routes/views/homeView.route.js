import express from 'express'
import { onlyAuth } from '../../middlewares/auth.js'
import { handleHomeView, handleUnauthorizedView } from '../../controllers/views/homeView.controller.js'

export const homeView = express.Router()
   
homeView.get('/', onlyAuth, handleHomeView)

homeView.get('/unauthorized', onlyAuth, handleUnauthorizedView)