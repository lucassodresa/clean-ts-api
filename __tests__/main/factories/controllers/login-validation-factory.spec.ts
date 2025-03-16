import { mockEmailValidator } from '@/__tests__/validation/mocks'
import { makeLoginValidation } from '@/main/factories'
import { Validation } from '@/presentation/protocols'
import { EmailValidation, RequiredFieldValidation, ValidationComposite } from '@/validation/validators'

jest.mock('@/validation/validators/validation-composite')

describe('Login Validation Factory', () => {
  test('Should call validation composite with all validations', () => {
    makeLoginValidation()
    const validations: Validation[] = []

    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new EmailValidation('email', mockEmailValidator()))

    expect(ValidationComposite).toBeCalledWith(validations)
  })
})
