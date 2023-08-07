export interface RentalI {
  id?: number
  startDate: string
  endDate: string
  numHours: number
  vehicleId: number
  userId: number
  createdAt?: Date
  updatedAt?: Date
}
