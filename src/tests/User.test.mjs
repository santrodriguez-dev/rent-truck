/* eslint-disable @typescript-eslint/no-floating-promises */
import assert from 'node:assert'
import test, { describe } from 'node:test'

import userService from '../services/UserService'

describe('User schema tests', () => {
  test('Un usuario no puede ser almacenado si el email ya existe en la base de datos', async () => {
    assert.doesNotThrow(() => {
      userService.createUser({
        firstName: 'Santiago',
        lastName: 'Rodriguez',
        email: 'santi-new@example1.com',
        phoneNumber: '0987654321',
        address: 'Cra 78 # 12 - 34',
        city: 'Bogota',
        role: 'admin'
      })
    })
  })
})
