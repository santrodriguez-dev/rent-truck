/* eslint-disable @typescript-eslint/no-floating-promises */
import assert from 'node:assert'
import test, { describe } from 'node:test'
import vehicleService from '../services/VehicleService'

describe('Vehicle schema tests', () => {
  test('Un vehiculo no puede ser almacenado si la placa ya existe en la base de datos', async () => {
    const response = await vehicleService.createVehicle({
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
    })

    assert.strictEqual(response.message, 'Vehicle already exists!')
    assert.strictEqual(response instanceof Error, true)
  })
})
