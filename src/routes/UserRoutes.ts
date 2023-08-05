import express from 'express'

export const userRouter = express.Router()

userRouter
  .get('/', (req, res) => res.json({ test: 'Hola test 2222!' }))
  .get('/:id', (req, res) => res.json({ test: 'Hola test 2222!' }))
