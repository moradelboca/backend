import express from 'express'

export const loginView = express.Router()
   
loginView.get('/', async (req, res) => {
  res.render('login', { title: 'Login' })
})