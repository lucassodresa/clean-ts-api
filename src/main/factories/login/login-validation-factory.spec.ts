import { makeLoginValidation } from './login-validation-factory'
import { ValidationComposite, RequiredFieldValidation, EmailValidation } from '../../../presentation/helpers/validators'
import { Validation } from '../../../presentation/protocols/validation'
import { EmailValidator } from '../../../presentation/protocols/email-validator'

jest.mock('../../../presentation/helpers/validators/validation-composite')

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

describe('Login Validation Factory', () => {
  test('Should call validation composite with all validations', () => {
    makeLoginValidation()
    const validations: Validation[] = []

    for (const field of ['name', 'email']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new EmailValidation('email', makeEmailValidator()))

    expect(ValidationComposite).toBeCalledWith(validations)
  })
})