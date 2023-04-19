import mongoose from 'mongoose'

const schemaProducts = new mongoose.Schema({
    products: [{
      id: {type: Number, required: true},
      quantity: {type: Number, required: true}
    }]
}, { versionKey: false })