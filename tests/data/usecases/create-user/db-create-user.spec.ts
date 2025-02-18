import { DbCreateUser } from '@/data/usecases/create-user/db-create-user'
import type { Hasher } from '@/data/protocols/cryptography/hasher'
import type { CreateUserRepository } from '@/data/protocols/db/user/create-user-repository'
import { mockUser } from '@/tests/presentation/mocks/mock-user'

class HasherSpy implements Hasher {
  digest = 'hashed_password'
  value: string = ''

  async hash (value: string): Promise<string> {
    this.value = value
    return this.digest
  }
}

class CreateUserRepositorySpy implements CreateUserRepository {
  params: CreateUserRepository.Params = null as any
  result = mockUser()

  async create (params: CreateUserRepository.Params): Promise<CreateUserRepository.Result> {
    this.params = params
    return this.result
  }
}

type SutTypes = {
  sut: DbCreateUser
  hasherSpy: HasherSpy
  createUserRepositorySpy: CreateUserRepositorySpy
}

const makeSut = (): SutTypes => {
  const hasherSpy = new HasherSpy()
  const createUserRepositorySpy = new CreateUserRepositorySpy()
  const sut = new DbCreateUser(hasherSpy, createUserRepositorySpy)
  return {
    sut,
    hasherSpy,
    createUserRepositorySpy
  }
}

describe('DbCreateUser Usecase', () => {
  test('Should call Hasher with correct password', async () => {
    const { sut, hasherSpy } = makeSut()
    const createParams = {
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    }
    await sut.create(createParams)
    expect(hasherSpy.value).toBe(createParams.password)
  })

  test('Should call CreateUserRepository with correct values', async () => {
    const { sut, hasherSpy, createUserRepositorySpy } = makeSut()
    const createParams = {
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    }
    await sut.create(createParams)
    expect(createUserRepositorySpy.params).toEqual({
      ...createParams,
      password: hasherSpy.digest
    })
  })

  test('Should return a user on success', async () => {
    const { sut, createUserRepositorySpy } = makeSut()
    const createParams = {
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    }
    const user = await sut.create(createParams)
    expect(user).toEqual(createUserRepositorySpy.result)
  })
}) 
