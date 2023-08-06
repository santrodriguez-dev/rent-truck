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
      userId: Number(userId)
    }
  })
  return rentals
}

const getRentalsByVehicleId = async (vehicleId: number) => {
  const rentals = await rental.findMany({
    where: {
      vehicleId: Number(vehicleId)
    }
  })
  return rentals
}

const getRentalsByVehicleIdAndRangeDate = async (vehicleId: number, startDate: Date, numHours: number) => {
  const endDate = new Date(startDate.getTime() + (numHours * 60 * 60 * 1000))

  console.log({ startDate, endDate })
  const rentals = await rental.findMany({
    where: {
      vehicleId: Number(vehicleId),
      startDate: {
        gte: startDate.toISOString(), // greater than
        lte: endDate.toISOString() // less than
      }
    },
    orderBy: {
      startDate: 'asc'
    }
  })
  return rentals
}

const rentVehicle = async (rentData: RentalI) => {
  // Validar que no se cruce la fecha de alquiler
  const { startDate: startDateISO, numHours, vehicleId } = rentData
  const startDate = new Date(startDateISO)

  const rentalsVehicle = await getRentalsByVehicleIdAndRangeDate(Number(vehicleId), startDate, numHours)
  console.log({ rentalsVehicle })
  // Todo: obtener rentas de un horario especifico
  if (rentalsVehicle.length > 0) throw new VehicleInUseError()

  return await rental.create({
    data: rentData
  }).catch((error) => {
    throw new Error(error)
  })
}

export default {
  getAllRentals,
  getRentalsByUserId,
  rentVehicle,
  getRentalsByVehicleId
}
