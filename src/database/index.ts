import { PrismaClient } from '@prisma/client'

const { user, vehicle } = new PrismaClient()

const users = await user.findMany()
const vehicles = await vehicle.findMany({ include: { userOwner: true } })

console.log({ users, vehicles })
