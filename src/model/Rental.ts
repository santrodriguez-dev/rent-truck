import { rental } from '../database'
import { VehicleInUseError } from '../errors/ErrorHandlers'
import { type RentalI } from '../types'

const getAllRentals = async () => {
  const rentals = await rental.findMany()
  return rentals
}
const getRentalsByUserId = async (userId: string) => {
  const rentals = await rental.findMany({
    where: {
      userId
    }
  })
  return rentals
}

const getRentalsByVehicleId = async (vehicleId: string) => {
  const rentals = await rental.findMany({
    where: {
      vehicleId
    }
  })
  return rentals
}

const getRentalsByVehicleIdAndRangeDate = async (vehicleId: string, startDate: string, endDate: string) => {
  console.log({ startDate, endDate })
  const rentals = await rental.findMany({
    where: {
      vehicleId,
      OR: [
        {
          startDate: { lte: startDate },
          endDate: { gt: startDate }
        },
        {
          startDate: { lt: endDate },
          endDate: { gte: endDate }
        }
      ]
    },
    orderBy: {
      startDate: 'asc'
    }
  })
  return rentals
}

const rentVehicle = async (rentData: RentalI) => {
  // Validar que no se cruce la fecha de alquiler
  const { startDate: startDateISO, endDate: endDateISO, vehicleId } = rentData
  const rentalsVehicle = await getRentalsByVehicleIdAndRangeDate(vehicleId, startDateISO, endDateISO)

  if (rentalsVehicle.length > 0) throw new VehicleInUseError()

  return await rental.create({
    data: rentData
  }).catch((error) => {
    throw new Error(error)
  })
}

export const RentalService = {
  getAllRentals,
  getRentalsByUserId,
  rentVehicle,
  getRentalsByVehicleId
}
