const mongoose = require('mongoose')

const Schema = mongoose.Schema

const authorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    year: { type: Number }
  
}, {
    timestamps: true
})


module.exports = mongoose.model('Author', authorSchema)
