const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()

const Person = require('./models/person')
const config = require('./utils/config')

const app = express()

app.use(express.json())

app.use(cors())

app.use(express.static('build'))

morgan.token('body', (request) => JSON.stringify(request.body))

const url = config.MONGODB_URI

mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/health', (_req, res) => {
  res.send('ok')
})

app.get('/info', (request, response, next) => {
  Person.estimatedDocumentCount()
    .then(result => {
      response.send(`Phonebook has info for ${result} people <br /> ${Date()}`)
    })
    .catch(error => next(error))
})

app.get('/api/persons', (request, response, next) => {
  Person
    .find({})
    .then(persons => {
      response.json(persons)
    })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      person?
        response.json(person)
        :
        response.status(404).send({ error: 'unknown person' })
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id).then(result => {
    result?
      response.status(204).end()
      :
      response.status(400).end()
  })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true, runValidators: true, context: 'query' })
    .then(updatedPerson => {
      updatedPerson?
        response.json(updatedPerson)
        :
        response.status(404).send({ error: 'unknown person' })
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  const person = new Person({
    name: body.name,
    number: body.number
  })

  Person.exists({ name: person.name })
    .then(foundPerson => {
      foundPerson?
        response.status(400).send({ error: 'person already added' })
        :
        person.save()
          .then(savedPerson => {
            response.status(201).json(savedPerson)
          }).catch(error => next(error))
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.name)
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)

module.exports = app