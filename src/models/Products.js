export class Product {
  constructor(title, description, code, price, stock, category, thumbnails, status) {

    if (!title || !description || !code || !price || !stock || !category || !thumbnails || !status) {
      throw new Error('All data is required.');
    }
    if (typeof price != 'number') throw new Error('Price must be a number.')
    if (typeof stock != 'number') throw new Error('Stock must be a number.')
    if (typeof status != 'boolean') throw new Error('Status must be a boolean.')
    if (description.length > 100) throw new Error('Description must be less than 100 characters long.')
    if (stock < 0) throw new Error('Stock must be a positive number.')
    
    this.title = title
    this.description = description
    this.code = code
    this.price = price
    this.stock = stock
    this.category = category
    this.thumbnails = thumbnails
    this.status = status
  }
}