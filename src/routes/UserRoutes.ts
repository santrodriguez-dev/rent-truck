import express from 'express'
import { createUser, getAllUsers, getUserById } from '../controllers/UserController'
import { validateCreateUser } from '../middlewares'

export const userRouter = express.Router()

userRouter
  .get('/', getAllUsers)
  .get('/:id', getUserById)
  .post('/', validateCreateUser, createUser)
