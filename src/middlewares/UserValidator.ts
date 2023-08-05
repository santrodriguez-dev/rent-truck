import { type NextFunction, type Request, type Response } from 'express'
import { email, minLength, object, string, enumType, optional, safeParseAsync, length } from 'valibot'
export const validateCreateUser = async (req: Request, res: Response, next: NextFunction) => {
  const CreateUserSchema =
    object({
      firstName: string('First name must be a string.'),
      lastName: optional(string('Last name must be a string.')),
      phoneNumber: string('Your phoneNumber must be a string.', [length(10, 'phone number should be 10 digits')]),
      city: string('City must be a string.'),
      email: string('Your email must be a string.', [
        minLength(1, 'Please enter your email.'),
        email('The email address is badly formatted.')
      ]),
      role: optional(enumType(['admin', 'user', 'driver'], 'Role must be one of the following: admin, user, driver'))
    })

  const userToAdd = req.body
  const validatorResult = await safeParseAsync(CreateUserSchema, userToAdd)

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
