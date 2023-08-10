import express from 'express'
import { getAllRentals, getRentalsByUserId, rentVehicle, getRentalsByVehicleId } from '../controllers/RentalController'
import { validateRentVehicle } from '../middlewares'

export const rentalRouter = express.Router()

rentalRouter
  .get('/', getAllRentals)
  .get('/:userId', getRentalsByUserId)
  .get('/vehicle/:vehicleId', getRentalsByVehicleId)
  .post('/', validateRentVehicle, rentVehicle)
