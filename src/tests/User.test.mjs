import assert from 'node:assert'
import test, { describe } from 'node:test'

const URL_HOST = 'http://localhost:3000/api'

describe('User schema tests', () => {
  test('Should get only one user', async () => {
    const response = await fetch(`${URL_HOST}/user`)
    const json = await response.json()
    assert.strictEqual(response.status, 200)
    assert.strictEqual(json.length, 1)
  })

  test('Un usuario no puede ser almacenado si el email ya existe en la base de datos', async () => {
    const userToCreate = {
      firstName: 'Santiago',
      lastName: 'Rodriguez',
      email: 'user-repeated@example.com',
      phoneNumber: '0987654321',
      address: 'Cra 78 # 12 - 34',
      city: 'Bogota',
      role: 'admin'
    }

    const response = await fetch(`${URL_HOST}/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userToCreate)
    })

    const json = await response.json()
    assert.strictEqual(response.status, 400)
    assert.strictEqual(json, 'Email already exists!')
  })
})
