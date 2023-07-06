import express from 'express'

export const homeView = express.Router()
   
homeView.get('/', async (req, res) => {
  res.render('home', { title: 'Home' })
})