import { SignUpController } from '@/presentation/controllers/signup/signup-controller'
import { CreateUserSpy, EmailValidatorSpy } from '@/tests/presentation/mocks/mock-user'

type SutTypes = {
  sut: SignUpController
  emailValidatorSpy: EmailValidatorSpy
  createUserSpy: CreateUserSpy
}

const makeSut = (): SutTypes => {
  const emailValidatorSpy = new EmailValidatorSpy()
  const createUserSpy = new CreateUserSpy()
  const sut = new SignUpController(emailValidatorSpy, createUserSpy)
  return {
    sut,
    emailValidatorSpy,
    createUserSpy
  }
}

describe('SignUp Controller', () => {
  test('Should return 400 if an invalid email is provided', async () => {
    const { sut, emailValidatorSpy } = makeSut()
    jest.spyOn(emailValidatorSpy, 'validate').mockReturnValueOnce(new Error('Invalid email'))
    const httpRequest = {
      name: 'any_name',
      email: 'invalid_email@mail.com',
      password: 'any_password'
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error('Invalid email'))
  })

  test('Should call EmailValidator with correct email', async () => {
    const { sut, emailValidatorSpy } = makeSut()
    const httpRequest = {
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    }
    await sut.handle(httpRequest)
    expect(emailValidatorSpy.email).toBe(httpRequest.email)
  })

  test('Should call CreateUser with correct values', async () => {
    const { sut, createUserSpy } = makeSut()
    const httpRequest = {
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    }
    await sut.handle(httpRequest)
    expect(createUserSpy.params).toEqual(httpRequest)
  })

  test('Should return 201 if valid data is provided', async () => {
    const { sut, createUserSpy } = makeSut()
    const httpRequest = {
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(201)
    expect(httpResponse.body).toEqual(createUserSpy.result)
  })

  test('Should return 500 if CreateUser throws', async () => {
    const { sut, createUserSpy } = makeSut()
    jest.spyOn(createUserSpy, 'create').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpRequest = {
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new Error('Internal server error'))
  })
}) 
