import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({})

// prisma.$connect()
//   .then(() => { console.log('Connected to database') })
//   .catch((e) => {
//     prisma.$disconnect()
//     console.log('Error connecting to database')
//     console.error(e)
//     process.exit(1)
//   })

export const { user, vehicle, rental } = prisma
