import { PrismaErrorCode } from '../types/PrismaErrors'
import { vehicle } from '../database'
import { VehicleAlreadyExistsError } from '../errors/ErrorHandlers'

const getAllVehicles = async () => {
  return await vehicle.findMany()
}

const getVehicleByPlate = async (plate: string) => {
  const vehicleFound = await vehicle.findFirst({
    where: {
      plate
    },
    select: {
      brand: true,
      model: true,
      plate: true,
      Owner: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          phoneNumber: true
        }
      }
    }
  })
  return vehicleFound
}

const createVehicle = async (vehicleData: any) => {
  return await vehicle.create({
    data: vehicleData
  }).catch((error) => {
    if (error.code === PrismaErrorCode.P2002) throw new VehicleAlreadyExistsError()

    throw new Error(error)
  })
}

const updateVehicle = async (vehicleId: string, vehicleData: any) => {
  return await vehicle.update({
    where: {
      id: vehicleId
    },
    data: vehicleData
  }).catch((error) => {
    console.error(error)
    if (error.code === PrismaErrorCode.P2002) throw new VehicleAlreadyExistsError()

    throw new Error(error)
  })
}

export const VehicleService = {
  getAllVehicles,
  getVehicleByPlate,
  createVehicle,
  updateVehicle
}
