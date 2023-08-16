import { user } from '../database'
import { PrismaErrorCode } from '../types/PrismaErrors'
import { EmailAlreadyExistsError } from '../errors/ErrorHandlers'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export abstract class UserModel {
  static async getAllUsers () {
    const users = await user.findMany()
    return users
  }

  static async getUserById (id: string) {
    const userFound = await user.findUnique({
      where: {
        id
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true
      }
    })
    return userFound
  }

  static async createUser (userInfo: any) {
    return await user.create({
      data: userInfo
    }).then((userCreated) => {
      return userCreated
    }).catch((error) => {
      if (error.code === PrismaErrorCode.P2002) throw new EmailAlreadyExistsError()

      throw new Error(error)
    })
  }
}
