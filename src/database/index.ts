import { PrismaClient } from '@prisma/client'

export const { user, vehicle, rental } = new PrismaClient({})
