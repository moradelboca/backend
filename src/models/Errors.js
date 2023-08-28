export class AuthenticationError extends Error {
  constructor(message='Invalid credentials') {
    super(message)
    this.type = 'AUTHENTICATION_ERROR'
  }
}

export class AuthorizationError extends Error {
  constructor(message='Not authorized to access this resource') {
    super(message)
    this.type = 'AUTHORIZATION_ERROR'
  }
}

export class NotFoundError extends Error {
  constructor(message='Resource not found') {
    super(message)
    this.type = 'NOT_FOUND_ERROR'
  }
}

export class InvalidDataError extends Error {
  constructor(message='Invalid data provided') {
    super(message)
    this.type = 'INVALID_DATA_ERROR'
  }
}