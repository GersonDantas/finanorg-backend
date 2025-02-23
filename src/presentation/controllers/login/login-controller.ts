  import type { Controller, HttpResponse, Validation } from '@/presentation/protocols'
  import type { Authentication } from '@/domain/usecases/authentication'
  import { badRequest, serverError, unauthorized, ok } from '@/presentation/helpers'
  import { ServerError } from '@/presentation/errors/server-error';

  export class LoginController implements Controller {
    constructor (
      private readonly validation: Validation,
      private readonly authentication: Authentication
    ) {}

    async handle (request: LoginController.Request): Promise<HttpResponse> {
      try {
        const error = this.validation.validate(request)
        if (error) {
          return badRequest(error)
        }

        const { email, password } = request
        const authModel = await this.authentication.auth({ email, password })
        
        if (!authModel) {
          return unauthorized()
        }

        return ok(authModel)
      } catch (_: unknown) {
        return serverError(new ServerError('Server Error'))
      }
    }
  }

  export namespace LoginController {
    export interface Request {
      email: string
      password: string
    }
  } 
