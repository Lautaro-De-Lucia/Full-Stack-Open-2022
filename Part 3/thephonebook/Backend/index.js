require('dotenv').config()  
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const Person = require('./models/person') 

morgan.token('body', (req) => JSON.stringify(req.body))

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.use(express.static('build'))
app.use(errorHandler)     

//  HTTP GET

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})
  
app.get('/api/persons', (request, response) => {
  Person.find({}).then(person => {
    response.json(person)
  })
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })
})

app.get('/info', (request, response) => {
  const date = new Date()
  response.send(`Phonebook has info for ${Person.length} people <br/>${date}`)
})

//  HTTP DELETE 

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})
  
//  HTTP POST 
  
const generateId = () => {
  const newId = Math.floor(Math.random() * 1000)
  return newId
}
  
app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({  
      error: 'name missing' 
    })
  }
  if (!body.number) {
    return response.status(400).json({  
      error: 'number missing' 
    })
  }
    
  const person = new Person({
    id: generateId(),
    name: body.name,
    number: body.number,
  })
  
  person.save().then(savedPerson => {
    response.json(savedPerson)
  })  

})

const PORT = process.env.PORT 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})