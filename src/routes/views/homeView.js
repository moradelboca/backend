import express from 'express'
import { onlyAuth } from '../../middlewares/auth.js'

export const homeView = express.Router()
   
homeView.get('/', onlyAuth, async (req, res) => {
  res.render('home', { title: 'Home' })
})