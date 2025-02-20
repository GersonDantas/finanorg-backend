import { ValidationComposite } from '@/main/composers';
import { RequiredFieldValidation } from '@/validation/validators'

export const makeSignUpValidation = (): ValidationComposite => {
  const validations = [
    new RequiredFieldValidation('name'),
    new RequiredFieldValidation('email'),
    new RequiredFieldValidation('password')
  ]
  return new ValidationComposite(validations)
} 
