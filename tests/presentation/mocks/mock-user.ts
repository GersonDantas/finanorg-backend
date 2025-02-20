import type { User } from '@/domain/models'
import type { CreateUser } from '@/domain/usecases/create-user'
import { Validation } from '@/presentation/protocols/validation';
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

export class EmailValidatorSpy implements Validation {
  email: string = ''
  result = true

  validate (input: any): Error | null {
    this.email = input.email
    return null
  }
}
