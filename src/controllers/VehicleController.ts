import { vehicle } from '../database'

export const getAllVehicles = async (req: any, res: any) => {
  try {
    const vehicles = await vehicle.findMany()
    res.json(vehicles)
  } catch (error) {
    console.log(error)
    res.status(500).json('Error reading vehicles')
  }
}

export const getVehicleByPlate = async (req: any, res: any) => {
  try {
    const vehicleFound = await vehicle.findFirst({
      where: {
        plate: req.params.plate
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
    res.json(vehicleFound)
  } catch (error) {
    console.log(error)
    res.status(500).json('Error reading vehicle')
  }
}
