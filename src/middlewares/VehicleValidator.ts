import { type NextFunction, type Request, type Response } from 'express'
import { object, string, enumType, optional, safeParseAsync, number, boolean, minValue, maxValue, isoTimestamp } from 'valibot'

export const validateCreateVehicle = async (req: Request, res: Response, next: NextFunction) => {
  const CreateUserSchema =
    object({
      brand: string('Brand name must be a string.'),
      model: optional(string('Model name must be a string.')),
      year: string([isoTimestamp('Year must be a timestamp.')]),
      plate: string('Plate must be a string.'),
      size: optional(enumType(['small', 'medium', 'large'], 'Size must be one of the following: small, medium, large')),
      location: optional(string('Location must be a string.')),
      pricePerHour: number('Price per hour must be a number.', [minValue(10000, 'Price per hour must be at least 10000.'), maxValue(200000, 'Price per hour must be at most 200000.')]),
      color: optional(string('Color must be a string.')),
      city: string('City must be a string.'),
      available: boolean('Available must be a boolean.'),
      userOwnerId: number('User owner id must be a number.')
    })

  const vehicleToAdd = req.body
  const validatorResult = await safeParseAsync(CreateUserSchema, vehicleToAdd)

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

export const validateUpdateVehicle = async (req: Request, res: Response, next: NextFunction) => {
  const CreateUserSchema =
    object({
      brand: optional(string('Brand name must be a string.')),
      model: optional(string('Model name must be a string.')),
      year: optional(string([isoTimestamp('Year must be a timestamp.')])),
      plate: optional(string('Plate must be a string.')),
      size: optional(enumType(['small', 'medium', 'large'], 'Size must be one of the following: small, medium, large')),
      location: optional(string('Location must be a string.')),
      pricePerHour: optional(number('Price per hour must be a number.', [minValue(10000, 'Price per hour must be at least 10000.'), maxValue(200000, 'Price per hour must be at most 200000.')])),
      color: optional(string('Color must be a string.')),
      city: optional(string('City must be a string.')),
      available: optional(boolean('Available must be a boolean.')),
      userOwnerId: optional(number('User owner id must be a number.'))
    })

  const vehicleToAdd = req.body
  const validatorResult = await safeParseAsync(CreateUserSchema, vehicleToAdd)

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
