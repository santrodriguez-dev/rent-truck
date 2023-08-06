import express from 'express'
import { getAllVehicles, getVehicleByPlate, createVehicle, updateVehicle } from '../controllers/VehicleController'
import { validateCreateVehicle, validateUpdateVehicle } from '../middlewares'

export const vehicleRouter = express.Router()

vehicleRouter
  .get('/', getAllVehicles)
  .get('/:plate', getVehicleByPlate)
  .post('/', validateCreateVehicle, createVehicle)
  .put('/:id', validateUpdateVehicle, updateVehicle)
  .get('rentals/:id', () => { })// Metodo que obtiene todas las rentas de un vehiculo
