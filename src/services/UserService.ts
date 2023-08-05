// Comunication with database

import { user } from '../database'
import { PrismaErrorCode } from '../constants/PrismaErrors'
import { EmailAlreadyExistsError } from '../errors/ErrorHandlers'

const getAllUsers = async () => {
  const users = await user.findMany()
  return users
}
const getUserById = async (userId: string) => {
  const userFound = await user.findUnique({
    where: {
      id: Number(userId)
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

const createUser = async (userInfo: any) => {
  return await user.create({
    data: userInfo
  }).then((userCreated) => {
    return userCreated
  }).catch((error) => {
    if (error.code === PrismaErrorCode.P2002) throw new EmailAlreadyExistsError()

    throw new Error(error)
  })
}

export default {
  getAllUsers,
  getUserById,
  createUser
}
