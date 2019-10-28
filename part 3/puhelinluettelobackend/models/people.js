const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const url = process.env.MONGODB_URI

console.log('connectin to', url)

mongoose.connect(url, { useNewUrlParser: true })
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error) =>{
        console.log('error connecting to MongoDB:', error.message)
    })

const peopleSchema = new mongoose.Schema({
    id: String,
    name: {
        type: String,
        minlength: 1,
        required: true,
        unique: true,
    },
    number: {
        type: String,
        minlength: 1,
        required: true,
    },
    
})

peopleSchema.plugin(uniqueValidator)

peopleSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

  module.exports = mongoose.model('Person', peopleSchema);