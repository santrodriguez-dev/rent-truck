import express from 'express'
import { getAllVehicles, getVehicleByPlate } from '../controllers/VehicleController'

export const vehicleRouter = express.Router()

vehicleRouter
  .get('/', getAllVehicles)
  .get('/:plate', getVehicleByPlate)
