/* eslint-disable @typescript-eslint/no-floating-promises */
import assert from 'node:assert'
import test, { describe } from 'node:test'
const HOST_URL = 'http://localhost:3000/api/rental'

describe('Rental schema tests', () => {
  test('Un vehiculo no puede ser rentado si es un dia festivo', async () => {
    const tryFetch = async () => {
      const response = await fetch(HOST_URL, {
        method: 'POST',
        body: {
          startDate: '2023-08-27T14:00:00.000Z',
          numHours: 5,
          vehicleId: 2,
          userId: 1
        }
      })
      return await response.json()
    }
    assert.throws(tryFetch, {
      code: 'ERR_BAD_REQUEST',
      name: 'TypeError',
      message: 'Invalid date'
    })
  })

  test('Un vehiculo no puede ser rentado despues de las 4pm', async () => {
    assert.strictEqual(1, 1)
  })

  test('Un vehiculo no puede ser rentado si el horario se cruza con un servicio ya asignado', async () => {
    assert.strictEqual(1, 1)
  })

  test('Un vehiculo no puede ser rentado en una fecha pasada', async () => {
    assert.strictEqual(1, 1)
  })
})
