import { LoginController } from '@/presentation/controllers/login/login-controller'
import { AuthenticationModel } from '@/domain/models/authentication'
import type { Authentication } from '@/domain/usecases/authentication'
import type { Validation } from '@/presentation/protocols'
import { UnauthorizedError, ServerError } from '@/presentation/errors'

class ValidationSpy implements Validation {
  error: Error | null = null
  input: any

  validate (input: any): Error | null {
    this.input = input
    return this.error
  }
}

const makeValidationSpy = (): ValidationSpy => {
  return new ValidationSpy()
}

class AuthenticationSpy implements Authentication {
  params: Authentication.Params = {
    email: 'any_email@mail.com',
    password: 'any_password'
  }
  result: AuthenticationModel = {
    accessToken: 'any_token',
    name: 'any_name'
  }

  async auth (params: Authentication.Params): Promise<Authentication.Result> {
    this.params = params
    return this.result
  }
}

const makeAuthenticationSpy = (): AuthenticationSpy => {
  return new AuthenticationSpy()
}

type SutTypes = {
  sut: LoginController
  validationSpy: ValidationSpy
  authenticationSpy: AuthenticationSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = makeValidationSpy()
  const authenticationSpy = makeAuthenticationSpy()
  const sut = new LoginController(validationSpy, authenticationSpy)
  return {
    sut,
    validationSpy,
    authenticationSpy
  }
}

describe('Login Controller', () => {
  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationSpy } = makeSut()
    const error = new Error('validation_error')
    jest.spyOn(validationSpy, 'validate').mockReturnValueOnce(error)
    const httpResponse = await sut.handle({ email: 'any_email@mail.com', password: 'any_password' })
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(error)
  })

  test('Should call Authentication with correct values', async () => {
    const { sut, authenticationSpy } = makeSut()
    const request = {
      email: 'any_email@mail.com',
      password: 'any_password'
    }
    await sut.handle(request)
    expect(authenticationSpy.params).toEqual(request)
  })

  test('Should return 401 if invalid credentials are provided', async () => {
    const { sut, authenticationSpy } = makeSut()
    jest.spyOn(authenticationSpy, 'auth').mockResolvedValueOnce(null)
    const httpResponse = await sut.handle({
      email: 'any_email@mail.com',
      password: 'any_password'
    })
    expect(httpResponse.statusCode).toBe(401)
    expect(httpResponse.body).toEqual(new UnauthorizedError())
  })

  test('Should return 500 if Authentication throws', async () => {
    const { sut, authenticationSpy } = makeSut()
    jest.spyOn(authenticationSpy, 'auth').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle({
      email: 'any_email@mail.com',
      password: 'any_password'
    })
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError('Server Error'))
  })

  test('Should return 200 if valid credentials are provided', async () => {
    const { sut, authenticationSpy } = makeSut()
    const httpResponse = await sut.handle({
      email: 'any_email@mail.com',
      password: 'any_password'
    })
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual(authenticationSpy.result)
  })
}) 
