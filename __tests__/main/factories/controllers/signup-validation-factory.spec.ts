import { mockEmailValidator } from '@/__tests__/validation/mocks'
import { makeSignUpValidation } from '@/main/factories'
import { Validation } from '@/presentation/protocols'
import { ComapreFieldsValidation, EmailValidation, RequiredFieldValidation, ValidationComposite } from '@/validation/validators'

jest.mock('@/validation/validators/validation-composite')

describe('SignUp Validation Factory', () => {
  test('Should call validation composite with all validations', () => {
    makeSignUpValidation()
    const validations: Validation[] = []

    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }

    validations.push(new ComapreFieldsValidation('password', 'passwordConfirmation'))
    validations.push(new EmailValidation('email', mockEmailValidator()))

    expect(ValidationComposite).toBeCalledWith(validations)
  })
})
