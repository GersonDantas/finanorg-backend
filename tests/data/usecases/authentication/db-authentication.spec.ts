import { DbAuthentication } from '@/data/usecases/authentication/db-authentication'
import type { LoadUserByEmailRepository } from '@/data/protocols/db/user/load-user-by-email-repository'
import type { HashComparer } from '@/data/protocols/cryptography/hash-comparer'
import type { TokenGenerator } from '@/data/protocols/cryptography/token-generator'
import { mockUser } from '@/tests/presentation/mocks/mock-user'
import { AuthenticationModel } from '@/domain/models/authentication';

class LoadUserByEmailRepositorySpy implements LoadUserByEmailRepository {
  email: string = ''
  result = mockUser()

  async loadByEmail (email: string): Promise<LoadUserByEmailRepository.Result> {
    this.email = email
    return this.result
  }
}

const makeLoadUserByEmailRepository = (): LoadUserByEmailRepositorySpy => {
  return new LoadUserByEmailRepositorySpy()
}

class HashComparerSpy implements HashComparer {
  plaintext: string = ''
  digest: string = ''
  result = true

  async compare (plaintext: string, digest: string): Promise<boolean> {
    this.plaintext = plaintext
    this.digest = digest
    return this.result
  }
}

const makeHashComparer = (): HashComparerSpy => {
  return new HashComparerSpy()
}

class TokenGeneratorSpy implements TokenGenerator {
  id: string = ''
  result = 'any_token'

  async generate (id: string): Promise<string> {
    this.id = id
    return this.result
  }
}

const makeTokenGeneratorSpy = (): TokenGeneratorSpy => {
  return new TokenGeneratorSpy()
}

type SutTypes = {
  sut: DbAuthentication
  loadUserByEmailRepositorySpy: LoadUserByEmailRepositorySpy
  hashComparerSpy: HashComparerSpy
  tokenGeneratorSpy: TokenGeneratorSpy
}

const makeSut = (): SutTypes => {
  const loadUserByEmailRepositorySpy = makeLoadUserByEmailRepository()
  const hashComparerSpy = makeHashComparer()
  const tokenGeneratorSpy = makeTokenGeneratorSpy()
  const sut = new DbAuthentication(
    loadUserByEmailRepositorySpy,
    hashComparerSpy,
    tokenGeneratorSpy
  )
  return {
    sut,
    loadUserByEmailRepositorySpy,
    hashComparerSpy,
    tokenGeneratorSpy
  }
}

describe('DbAuthentication UseCase', () => {
  test('Should call LoadUserByEmailRepository with correct email', async () => {
    const { sut, loadUserByEmailRepositorySpy } = makeSut()
    await sut.auth({ email: 'any_email@mail.com', password: 'any_password' })
    expect(loadUserByEmailRepositorySpy.email).toBe('any_email@mail.com')
  })

  test('Should return null if LoadUserByEmailRepository returns null', async () => {
    const { sut, loadUserByEmailRepositorySpy } = makeSut()
    jest.spyOn(loadUserByEmailRepositorySpy, 'loadByEmail').mockResolvedValueOnce(null as any)
    const model = await sut.auth({ email: 'any_email@mail.com', password: 'any_password' })
    expect(model).toBeNull()
  })

  test('Should call HashComparer with correct values', async () => {
    const { sut, hashComparerSpy } = makeSut()
    await sut.auth({ email: 'any_email@mail.com', password: 'any_password' })
    expect(hashComparerSpy.plaintext).toBe('any_password')
    expect(hashComparerSpy.digest).toBe('any_password')
  })

  test('Should return null if HashComparer returns false', async () => {
    const { sut, hashComparerSpy } = makeSut()
    jest.spyOn(hashComparerSpy, 'compare').mockResolvedValueOnce(false)
    const model = await sut.auth({ email: 'any_email@mail.com', password: 'any_password' })
    expect(model).toBeNull()
  })

  test('Should call TokenGenerator with correct id', async () => {
    const { sut, tokenGeneratorSpy } = makeSut()
    await sut.auth({ email: 'any_email@mail.com', password: 'any_password' })
    expect(tokenGeneratorSpy.id).toBe('any_id')
  })

  test('Should return an authentication model on success', async () => {
    const { sut } = makeSut()
    const { accessToken, name } = await sut.auth({ 
      email: 'any_email@mail.com', 
      password: 'any_password' 
    }) as AuthenticationModel
    expect(accessToken).toBe('any_token')
    expect(name).toBe('any_name')
  })
}) 
