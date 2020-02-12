// allgemeines Server-Template

const fs = require('fs')
const express = require('express')
const uid = require('uid')
const cors = require('cors')
const helmet = require('helmet')

const { PORT = 3334 } = process.env

function saveCards(cards, res, output) {
  fs.writeFile('./cards.json', JSON.stringify(cards, null, 2), err => {
    if (err) {
      res.end('Error: could not write file.')
    } else {
      res.json(output)
    }
  })
}

let cards = require('./cards.json')

const app = express()
app.use(express.json())
app.use(helmet())
app.use(cors()) //cross-origin-resource-sharing
app.listen(PORT, () => console.log(`Express ready on port ${PORT}`))

app.get('/cards', (req, res) => {
  res.json(cards)
})

app.get('/cards/:id', (req, res) => {
  const { id } = req.params
  const card = cards.find(card => card.id === id)
  res.json(card)
})

app.post('/cards', (req, res) => {
  const card = { ...req.body, id: uid() }
  cards = [...cards, card]
  saveCards(cards, res, card)
})

app.patch('/cards/:id', (req, res) => {
  const id = req.params.id
  const index = cards.findIndex(card => card.id === id)
  cards[index] = { ...cards[index], ...req.body }
  saveCards(cards, res, cards[index])
})

app.delete('/cards/:id', (req, res) => {
  const id = req.params.id
  const index = cards.findIndex(card => card.id === id)
  const cardToDelete = cards[index]
  cards.splice(index, 1)
  saveCards(cards, res, cardToDelete)
})
