import { EmailAlreadyExistsError } from '../errors/ErrorHandlers'
import userService from '../services/UserService'
import { type Request, type Response } from 'express'

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers()
    res.json(users)
  } catch (error) {
    console.log(error)
    res.status(500).json('Error reading users')
  }
}

export const getUserById = async (req: any, res: any) => {
  try {
    const userFound = await userService.getUserById(req.params.id)
    if (!userFound) return res.status(404).json('User not found')
    res.json(userFound)
  } catch (error) {
    console.log(error)
    res.status(500).json('Error reading user')
  }
}

export const createUser = async (req: any, res: any) => {
  const userToAdd = req.body
  try {
    const userCreated = await userService.createUser(userToAdd)
    res.json(userCreated)
  } catch (error) {
    if (error instanceof EmailAlreadyExistsError) return res.status(400).json(error.message)

    console.log(error)
    res.status(500).json('Error creating user')
  }
}
