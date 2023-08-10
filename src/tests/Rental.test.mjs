import assert from 'node:assert'
import test, { describe } from 'node:test'

const HOST_URL = 'http://localhost:3000/api/rental'

describe('Rental schema tests', () => {
  test('Un vehiculo no puede ser rentado si es un dia festivo', async () => {
    const rentalTocreate = {
      startDate: '2030-12-22T19:00:00.000Z',
      numHours: 2,
      vehicleId: 1,
      userId: 1
    }

    const response = await fetch(HOST_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(rentalTocreate)
    })

    const json = await response.json()

    assert.strictEqual(response.status, 400)
    assert.strictEqual(json.type, 'ValidationError')
  })

  test('Un vehiculo no puede ser rentado despues de las 4pm', async () => {
    const rentalTocreate = {
      startDate: '2030-12-22T22:00:00.000Z',
      numHours: 2,
      vehicleId: 1,
      userId: 1
    }

    const response = await fetch(HOST_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(rentalTocreate)
    })

    const json = await response.json()

    assert.strictEqual(response.status, 400)
    assert.strictEqual(json.type, 'ValidationError')
  })

  test('Un vehiculo no puede ser rentado si el horario se cruza con un servicio ya asignado', async () => {
    const rentalTocreate = {
      startDate: '2023-08-15T10:00:00.000Z',
      numHours: 2,
      vehicleId: 1,
      userId: 1
    }

    const response = await fetch(HOST_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(rentalTocreate)
    })

    const json = await response.json()

    assert.strictEqual(response.status, 400)
    assert.strictEqual(json, 'Vehicle will used in that schedule!')
  })

  test('Un vehiculo no puede ser rentado en una fecha pasada', async () => {
    const rentalTocreate = {
      startDate: '2000-08-15T10:00:00.000Z',
      numHours: 2,
      vehicleId: 1,
      userId: 1
    }

    const response = await fetch(HOST_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(rentalTocreate)
    })

    const json = await response.json()

    assert.strictEqual(response.status, 400)
    assert.strictEqual(json.type, 'ValidationError')
  })
})
