import { SignUpController } from '@/presentation/controllers/signup/signup-controller'
import { makeDbCreateUser } from '@/main/factories/usecases/create-user/db-create-user-factory'
import { makeSignUpValidation } from './signup-validation-factory'

export const makeSignUpController = (): SignUpController => new SignUpController(
    makeSignUpValidation(),
    makeDbCreateUser()
  ) 
