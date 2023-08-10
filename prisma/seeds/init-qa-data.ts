import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({})
const { user, vehicle, rental } = prisma

async function main () {
  const firstUser = await user.create({
    data: {
      firstName: 'Santiago',
      lastName: 'Rodriguez',
      email: 'user-repeated@example.com',
      phoneNumber: '0987654321',
      address: 'Cra 78 # 12 - 34',
      city: 'Bogota',
      role: 'admin'
    }
  })

  const vehicle1 = await vehicle.create({
    data: {
      brand: 'Renault',
      model: 'megane',
      plate: 'CPS-519',
      userOwnerId: 1,
      color: 'Gris',
      size: 'small',
      year: '2007-08-05T03:19:08.000Z',
      available: true,
      location: 'Cra 45 # 6-98',
      pricePerHour: 50000,
      city: 'Bogota'
    }
  })

  const rental1 = await rental.create({
    data: {
      startDate: '2023-08-15T10:00:00.000Z',
      endDate: '2023-08-15T12:00:00.000Z',
      numHours: 2,
      vehicleId: 1,
      userId: 1
    }
  })
  console.log({ firstUser, vehicle1, rental1 })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
