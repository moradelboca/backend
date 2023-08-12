import express from 'express'
import { handleLoginView, handleRegisterView } from '../../controllers/views/userAuthView.controller.js'

export const userAuthView = express.Router()
   
userAuthView.get('/register', handleRegisterView)
   
userAuthView.get('/login', handleLoginView)