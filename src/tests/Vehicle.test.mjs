import test, { describe } from 'node:test'
import assert from 'node:assert'

const URL_HOST = 'http://localhost:3000/api/vehicle'

describe('Vehicle schema tests', () => {
  test('Un vehiculo no puede ser almacenado si la placa ya existe en la base de datos', async () => {
    const vehicleToCreate = {
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

    const response = await fetch(URL_HOST, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(vehicleToCreate)
    })

    const json = await response.json()
    assert.strictEqual(response.status, 400)
    assert.strictEqual(json, 'Vehicle already exists!')
  })
})
