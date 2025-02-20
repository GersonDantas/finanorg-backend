import type { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import type { Authentication } from '@/domain/usecases/authentication'

export class LoginController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly authentication: Authentication
  ) {}

  async handle (request: LoginController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return {
          statusCode: 400,
          body: error
        }
      }

      const { email, password } = request
      const authModel = await this.authentication.auth({ email, password })
      
      if (!authModel) {
        return {
          statusCode: 401,
          body: new Error('Unauthorized')
        }
      }

      return {
        statusCode: 200,
        body: authModel
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: new Error('Internal server error')
      }
    }
  }
}

export namespace LoginController {
  export interface Request {
    email: string
    password: string
  }
} 
