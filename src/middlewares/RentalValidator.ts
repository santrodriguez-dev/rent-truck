import { type NextFunction, type Request, type Response } from 'express'
import { MAX_RENTAL_HOUR, MIN_RENTAL_HOUR, MIN_WEEK_DAY, MAX_WEEK_DAY } from '../constants'
import {
  object,
  string,
  safeParseAsync,
  isoTimestamp,
  number,
  required,
  minValue,
  maxValue,
  custom
} from 'valibot'

const dateInFuture = (isoDate: string) => {
  const startDate = new Date(isoDate)
  return startDate.getTime() > Date.now()
}

const dateOnlyInAllowedHours = (isoDate: string) => {
  const startRentalHour = (new Date(isoDate)).getHours() // hour of day
  return startRentalHour >= Number(MIN_RENTAL_HOUR) && startRentalHour <= Number(MAX_RENTAL_HOUR)
}

const dateOnlyInWeekDays = (isoDate: string) => {
  const startRentalDay = (new Date(isoDate)).getDay()
  return startRentalDay >= MIN_WEEK_DAY && startRentalDay <= MAX_WEEK_DAY
}

export const validateRentVehicle = async (req: Request, res: Response, next: NextFunction) => {
  const RentVehicleSchema =
    required(
      object({
        startDate: string('StartDate must be a string.', [
          isoTimestamp('startDate must be a timestamp.'),
          custom(dateInFuture, 'startDate must be in the future.'),
          custom(dateOnlyInAllowedHours, 'startDate must be in the allowed range (after 4am and before 4pm).'),
          custom(dateOnlyInWeekDays, 'startDate must be on weekdays (Monday-Friday).')
        ]),
        numHours: number('Num hours must be a number.', [
          minValue(2, 'Num hours must be at least 2.'),
          maxValue(8, 'Num hours must be at most 8.')
        ]),
        vehicleId: number('VehicleId must be a number.'),
        userId: number('UserId must be a number.')
      })
    )

  const rentToAdd = req.body
  const validatorResult = await safeParseAsync(RentVehicleSchema, rentToAdd, { abortEarly: true })

  if (!validatorResult.success) {
    console.error(validatorResult.error.issues)
    const issueMessages = validatorResult.error.issues.map((issue) => issue.message)

    const error = {
      error: true,
      type: 'ValidationError',
      message: issueMessages
    }
    return res.status(400).json(error)
  }
  next()
}
