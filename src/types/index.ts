export interface RentalI {
  id?: string
  startDate: string
  endDate: string
  numHours: number
  vehicleId: string
  userId: string
  createdAt?: Date
  updatedAt?: Date
}
