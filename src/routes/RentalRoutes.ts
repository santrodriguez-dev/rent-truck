import express from 'express'

export const rentalRouter = express.Router()

rentalRouter
  .get('/', (req, res) => res.json({ test: 'Hola test 2222!' }))
  .get('/:userId', (req, res) => res.json({ test: 'Hola test 2222!' }))
