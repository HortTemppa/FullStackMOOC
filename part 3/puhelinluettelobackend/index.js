/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

require('dotenv').config()
const express = require ('express')
const bodyParser = require('body-parser')
const app = express()
const Person = require('./models/people')
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json())

const morgan = require('morgan')

morgan.token('body',
  function (req){
    if (req.body){
      return JSON.stringify(req.body)}
    else
      console.log(req.body)
    return undefined
  })


app.use(morgan('tiny'))
app.use(morgan(':body', 'POST'))
app.use(express.static('build'))




let persons = [
  {
    name: 'Arto Hellas',
    number: '040-123456',
    id: 1
  },

  {
    name: 'Joku Numeros',
    number: '040-124545',
    id: 3
  },

  {
    name: 'Hah Toinen',
    number: '040-121993',
    id: 4
  },
  {
    name: 'Vielä lissöö',
    number: '040-125006',
    id: 5
  }
]

app.post('/api/persons', (request, response, next) => {
  const body = request.body
  const date = new Date()
  const person = new Person({
    name: body.name,
    number: body.number,
    date: date,
  })

  persons = persons.concat(person)
  person.save().then(savedPerson => {
    response.json(savedPerson.toJSON())
  })
    .catch(error =>
      next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id).then(result => {
    response.status(204).end()
  })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id).then(person => {
    if (person) {
      response.json(person.toJSON())
    }

    else {
      response.status(404).end()
    }
  })
    .catch(error => {
      console.log(error.name)
      console.log(error.kind)
      next(error)
    })
})

app.get('/info', (req, res) => {
  Person.find({}).then(persons => {
    console.log(persons.length)
    res.send(`<p>Phonebook has info of ${persons.length} contacts</p>`)
  })
})

app.get('/api/persons/', (_req, res) => {

  Person.find({}).then(persons => {
    console.log(persons)
    res.json(persons)
  }
  )}
)

const errorHandler = (error, _request, response, next) => {
//console.error(error.message)
  if (error.name === 'CastError' && error.kind == 'ObjectId') {
    response.status(400).send({ error: 'malformatted id' })
  }
  else if(error.name === 'ValidationError'){
    response.status(400).send({ error: 'name must be unique'})
  }
  next(error)
}
app.use(errorHandler)
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})