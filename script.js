const fs = require('fs')

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


const test = async () => {
  // Create a products countainer
  console.log('1-')
  productsContainer = new Container("products", "./products.txt")
  // Getting all items just to check it's empty (please delete products file on first run, just for testing purposes)  
  let products = await productsContainer.getAll() 
  console.log(products, '\n\n')
  
  // Adding 4 produts to the file
  console.log('2-')
  const prod1 = {name:'keyboard', price: 1200, thumbnail:'fakeurl.com'}
  const prod2 = {name:'mouse', price: 1000, thumbnail:'fakeurl.com'}
  const prod3 = {name:'display', price: 2000, thumbnail:'fakeurl.com'}
  const prod4 = {name:'headset', price: 500, thumbnail:'fakeurl.com'}
  await productsContainer.save(prod1)
  await productsContainer.save(prod2)
  await productsContainer.save(prod3)
  await productsContainer.save(prod4)
  // Checking if products were added correctly..
  products = await productsContainer.getAll()
  console.log(products, '\n\n')

  //Getting one product only and then deleting it
  console.log('3-')
  const pro = await productsContainer.getById(2)
  console.log(pro)
  await productsContainer.deleteById(pro.id) 
  products = await productsContainer.getAll() 
  console.log(products, '\n\n')
  
  // Deleting all products
  console.log('4-')
  await productsContainer.deleteAll()
  products = await productsContainer.getAll() 
  console.log(products, '\n\n')
}
test()