import type { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import type { CreateUser } from '@/domain/usecases/create-user'
import { badRequest } from '@/presentation/helpers'

export class SignUpController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly createUser: CreateUser
  ) {}

  async handle (request: SignUpController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }

      const { name, email, password } = request
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
