import type { Controller } from '@/presentation/protocols/controller'
import type { HttpResponse } from '@/presentation/protocols/http'
import type { CreateUser } from '@/domain/usecases/create-user'
import type { EmailValidator } from '@/validation/protocols/email-validator'

export class SignUpController implements Controller {
  constructor (
    private readonly emailValidator: EmailValidator,
    private readonly createUser: CreateUser
  ) {}

  async handle (request: SignUpController.Request): Promise<HttpResponse> {
    try {
      const { name, email, password } = request
      
      const isValidEmail = this.emailValidator.isValid(email)
      if (!isValidEmail) {
        return {
          statusCode: 400,
          body: new Error('Invalid email')
        }
      }

      const user = await this.createUser.create({
        name,
        email,
        password
      })

      return {
        statusCode: 201,
        body: user
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: new Error('Internal server error')
      }
    }
  }
}

export namespace SignUpController {
  export interface Request {
    name: string
    email: string
    password: string
  }
} 
