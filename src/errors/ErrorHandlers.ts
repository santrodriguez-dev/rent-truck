export class EmailAlreadyExistsError extends Error {
  constructor () {
    super('Email already exists!')
    this.name = 'EmailAlreadyExistsError'
  }
}
export class VehicleAlreadyExistsError extends Error {
  constructor () {
    super('Vehicle already exists!')
    this.name = 'VehicleAlreadyExistsError'
  }
}

export class ValidationError extends Error {
  constructor () {
    super('Validation error!')
    this.name = 'ValidationError'
  }
}
