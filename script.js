// Modules
const fs = require('fs')
const express = require('express')

const app = express()
const PORT = process.env.PORT || 8080

class Container{
  constructor(name, fileURL){
    this.name = name
    this.fileURL = fileURL
  }
  async checkExistance(){
    try{
      await fs.promises.access(this.fileURL, fs.constants.R_OK | fs.constants.W_OK)
      return
    }
    catch{
      console.log('Error: File wasn\'t found.')
      try{
        await fs.promises.writeFile(this.fileURL, JSON.stringify([]))
        console.log('File created successfully.')
      }
      catch{
        console.log("Error: File couldn't be created.") 
      }
    }
  }
  async getAll(){
    await this.checkExistance()
    try{
      const data = await fs.promises.readFile(this.fileURL, 'utf-8')
      return JSON.parse(data)
    }
    catch (err){
      console.log(`Error: ${err}`)
      // Just to avoid future errors...
      return []
    }
  }
  async save(object){
    await this.checkExistance()
    const data = await this.getAll()
    // Check if it's the first object...
    let objectID = !data.length ? 1 : data[data.length-1].id+1
    const newData = JSON.stringify([ ...data, {id:objectID, ...object } ])
    try{
      await fs.promises.writeFile(this.fileURL, newData)
      return objectID
    }
    catch (err){
      console.log(`Error: ${err}`)
      return -1
    }
  }
  async getById(objectID){
    await this.checkExistance()
    const data = await this.getAll()
    return data.find( object => object.id == objectID) ?? -1
  }
  async deleteById(objectID){
    await this.checkExistance()
    const data = await this.getAll()
    const newData = JSON.stringify(data.filter( object => object.id != objectID ))
    try{
      await fs.promises.writeFile(this.fileURL, newData)
    }
    catch (err){
      console.log(`Error: ${err}`)
    }
  }
  async deleteAll(){
    await this.checkExistance()
    try{
      await fs.promises.writeFile(this.fileURL, JSON.stringify([]))
    }
    catch (err){
      console.log(`Error: ${err}`)
    }
  }
}

const productsContainer = new Container('products', './products.txt')

app.get('/productos', async (req, res) => {
  const products = await productsContainer.getAll()
  res.json(products)
})

app.get('/', async (req, res) => {
  const products = await productsContainer.getAll()
  res.json(products)
})

app.get('/productoRandom', async (req, res) => {
  const randomNum = max => Math.floor(Math.random() * max)
  const products = await productsContainer.getAll()
  res.json(products[randomNum(products.length)])
})

const server = app.listen(PORT, () => {
  console.log(`App listening on port http://localhost:${PORT}`)

})
