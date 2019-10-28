//import Mongoose from "mongoose"

const mongoose = require('mongoose')

if (process.argv.length<3){
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://Teemu:${password}@clusteri-abrhw.mongodb.net/test?retryWrites=true&w=majority`

mongoose.connect(url, {useNewUrlParser: true})

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
})

if(process.argv.length === 3) {
    return Person.find({}).then(result =>{
        console.log('Phonebook:')
       result.forEach(person => 
        { console.log(`${person.name} ${person.number}`)
       })
       mongoose.connection.close();
       console.log('connection closed')
    }
    )

    
    
    }


person.save().then(response => {
    console.log(`added ${person.name} number ${person.number} to phonebook`)
    mongoose.connection.close();
})