import express from 'express'
import { getAllRentals, getRentalsByUserId } from '../controllers/RenatalController'

export const rentalRouter = express.Router()

rentalRouter
  .get('/', getAllRentals)
  .get('/:userId', getRentalsByUserId)
