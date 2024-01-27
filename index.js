const express = require("express")
const app = express()

app.use(express.json())

let data = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request,response) => {
    response.json(data)
})

app.get('/info', (request, response) => {

    response.send(
        `<p>Phonebook has info for ${data.length}</p>
        <p>${new Date()}</p>`
    )
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)

    const person = data.find((p) => {
        return p.id === id
    })

    if(person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    data = data.filter(p => p.id !== id)

    response.status(204).end()
})

const generateId = () => {
    const maxId = Math.max(...data.map(p => p.id))
    const max = 100

    return Math.floor((maxId + Math.random()) * max)
}

app.post('/api/persons', (request, response) => {
    const body = request.body

    if(!body.name || !body.number) {
        return response.status(400).json({
            error: 'The name or number is missing'
        })
    } else if(data.filter(p => p.name === body.name)) {
        return response.status(409).json({
            error: 'The name already exists in the phonebook'
        })
    }

    const person = {
        "id": generateId(),
        "name": body.name,
        "number": body.number
    }

    data = data.concat(person)
    response.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})