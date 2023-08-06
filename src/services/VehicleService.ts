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
      userOwner: {
        select: {
          id: true,
          firstName: true
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
      id: Number(vehicleId)
    },
    data: vehicleData
  }).catch((error) => {
    console.log(error)
    if (error.code === PrismaErrorCode.P2002) throw new VehicleAlreadyExistsError()

    throw new Error(error)
  })
}

export default {
  getAllVehicles,
  getVehicleByPlate,
  createVehicle,
  updateVehicle
}
