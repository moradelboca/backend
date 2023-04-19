import mongoose from 'mongoose'

const schemaProducts = new mongoose.Schema({
    id: { type: Number, required: true },
    products: [{
      id: {type: Number, required: true},
      quantity: {type: Number, required: true}
    }]
}, { versionKey: false })