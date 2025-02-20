import type { Authentication } from '@/domain/usecases/authentication'
import type { LoadUserByEmailRepository } from '@/data/protocols/db/user/load-user-by-email-repository'
import type { HashComparer } from '@/data/protocols/cryptography/hash-comparer'
import type { TokenGenerator } from '@/data/protocols/cryptography/token-generator'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadUserByEmailRepository: LoadUserByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly tokenGenerator: TokenGenerator
  ) {}

  async auth (data: Authentication.Params): Promise<Authentication.Result> {
    const user = await this.loadUserByEmailRepository.loadByEmail(data.email)
    if (user) {
      const isValid = await this.hashComparer.compare(data.password, user.password)
      if (isValid) {
        const accessToken = await this.tokenGenerator.generate(user.id)
        return {
          accessToken,
          name: user.name
        }
      }
    }
    return null
  }
} 
