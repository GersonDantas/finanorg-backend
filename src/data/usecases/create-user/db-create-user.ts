import type { CreateUser } from '@/domain/usecases/create-user'
import type { Hasher } from '@/data/protocols/cryptography/hasher'
import type { CreateUserRepository } from '@/data/protocols/db/user/create-user-repository'

export class DbCreateUser implements CreateUser {
  constructor (
    private readonly hasher: Hasher,
    private readonly createUserRepository: CreateUserRepository
  ) {}

  async create (data: CreateUser.Params): Promise<CreateUser.Result> {
    const hashedPassword = await this.hasher.hash(data.password)
    const user = await this.createUserRepository.create({
      ...data,
      password: hashedPassword
    })
    return user
  }
} 
