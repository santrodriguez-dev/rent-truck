import { rental } from '../database'

export const getAllRentals = async (req: any, res: any) => {
  try {
    const rentals = await rental.findMany()
    res.json(rentals)
  } catch (error) {
    console.log(error)
    res.status(500).json('Error reading rentals')
  }
}

export const getRentalsByUserId = async (req: any, res: any) => {
  try {
    const rentals = await rental.findMany({
      where: {
        userId: Number(req.params.userId)
      }
    })
    res.json(rentals)
  } catch (error) {
    console.log(error)
    res.status(500).json('Error reading rentals')
  }
}
