import express from 'express'

export const registerView = express.Router()
   
registerView.get('/', async (req, res) => {
  res.render('register', { title: 'Register' })
})