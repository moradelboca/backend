import crypto from 'crypto'
import { InvalidDataError } from "./Errors.js";

export class Product {
  constructor(title, description, code, price, stock, category, thumbnails=[], status=true) {

    if (!title || !description || !code || !price || !stock || !category || !thumbnails || !status) {
      throw new InvalidDataError('All data is required.');
    }
    if (typeof price != 'number') throw new InvalidDataError('Price must be a number.')
    if (typeof stock != 'number') throw new InvalidDataError('Stock must be a number.')
    if (typeof status != 'boolean') throw new InvalidDataError('Status must be a boolean.')
    if (typeof thumbnails != 'object') throw new InvalidDataError('Thumbnails must be an array.')
    if (description.length > 100) throw new InvalidDataError('Description must be less than 100 characters long.')
    if (title.length > 30) throw new InvalidDataError('Title must be less than 30 characters long.')
    if (code.length > 20) throw new InvalidDataError('Code must be less than 30 characters long.')
    if (category.length > 10) throw new InvalidDataError('Category must be less than 30 characters long.')
    if (stock < 0) throw new InvalidDataError('Stock must be a positive number.')
    if (price < 0) throw new InvalidDataError('Price must be a positive number.')
    
    this.title = title
    this.description = description
    this.code = code
    this.price = price
    this.stock = stock
    this.category = category
    this.thumbnails = thumbnails
    this.status = status
    this.id = crypto.randomUUID()
  }
}