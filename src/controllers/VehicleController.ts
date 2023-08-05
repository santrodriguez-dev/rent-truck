import { type Request, type Response } from 'express'
import vehicleService from '../services/VehicleService'
import { PrismaClientValidationError } from '@prisma/client/runtime/library'
import { VehicleAlreadyExistsError } from '../errors/ErrorHandlers'

export const getAllVehicles = async (req: Request, res: Response) => {
  try {
    const vehicles = await vehicleService.getAllVehicles()
    res.json(vehicles)
  } catch (error) {
    console.log(error)
    res.status(500).json('Error reading vehicles')
  }
}

export const getVehicleByPlate = async (req: Request, res: Response) => {
  try {
    const vehicleFound = await vehicleService.getVehicleByPlate(req.params.plate)
    if (!vehicleFound) return res.status(404).json('Vehicle not found')
    res.json(vehicleFound)
  } catch (error) {
    console.log(error)
    res.status(500).json('Error getting vehicle')
  }
}

export const createVehicle = async (req: Request, res: Response) => {
  const vehicleData = req.body
  try {
    const vehicleCreated = await vehicleService.createVehicle(vehicleData)
    res.status(200).json(vehicleCreated)
  } catch (error) {
    if (error instanceof VehicleAlreadyExistsError) return res.status(400).json(error.message)
    if (error instanceof PrismaClientValidationError) { console.log('PrismaClientValidationError', error.message) }

    console.log(error)

    res.status(500).json('Error creating vehicle')
  }
}

export const updateVehicle = async (req: Request, res: Response) => {
  const vehicleId = req.params.id
  const vehicleData = req.body
  try {
    const vehicleCreated = await vehicleService.updateVehicle(vehicleId, vehicleData)
    res.status(200).json(vehicleCreated)
  } catch (error) {
    if (error instanceof VehicleAlreadyExistsError) return res.status(400).json(error.message)
    if (error instanceof PrismaClientValidationError) { console.log('PrismaClientValidationError', error.message) }

    console.log(error)
    res.status(500).json('Error updating vehicle')
  }
}
