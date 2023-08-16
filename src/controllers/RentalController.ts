import { VehicleInUseError } from '../errors/ErrorHandlers'
import { RentalService } from '../model'
import { type Request, type Response } from 'express'

export const getAllRentals = async (req: Request, res: Response) => {
  try {
    const rentals = await RentalService.getAllRentals()
    res.json(rentals)
  } catch (error) {
    console.error(error)
    res.status(500).json('Error reading rentals')
  }
}

export const getRentalsByUserId = async (req: Request, res: Response) => {
  const userId = req.params.userId
  try {
    const rentals = await RentalService.getRentalsByUserId(userId)
    res.json(rentals)
  } catch (error) {
    console.error(error)
    res.status(500).json('Error reading rentals')
  }
}

export const getRentalsByVehicleId = async (req: Request, res: Response) => {
  const vehicleId = req.params.vehicleId
  try {
    const rentals = await RentalService.getRentalsByVehicleId(vehicleId)
    res.json(rentals)
  } catch (error) {
    console.error(error)
    res.status(500).json('Error reading rentals')
  }
}

export const rentVehicle = async (req: Request, res: Response) => {
  const data = req.body
  try {
    const vehicleRented = await RentalService.rentVehicle(data)
    res.status(200).json(vehicleRented)
  } catch (error) {
    if (error instanceof VehicleInUseError) return res.status(400).json(error.message)
    console.error(error)
    res.status(500).json('Error renting vehicle')
  }
}
