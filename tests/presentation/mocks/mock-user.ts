import type { User } from '@/domain/models/user'
import type { CreateUser } from '@/domain/usecases/create-user'
import type { EmailValidator } from '@/validation/protocols/email-validator'

export const mockUser = (): User => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password'
})

export class CreateUserSpy implements CreateUser {
  params!: CreateUser.Params
  result = mockUser()

  async create (params: CreateUser.Params): Promise<CreateUser.Result> {
    this.params = params
    return this.result
  }
}

export class EmailValidatorSpy implements EmailValidator {
  email: string = ''
  result = true

  isValid (email: string): boolean {
    this.email = email
    return this.result
  }
}
