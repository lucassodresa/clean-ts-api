import { makeLoginValidation } from '@/main/factories'
import { ValidationComposite, RequiredFieldValidation, EmailValidation } from '@/validation/validators'
import { Validation } from '@/presentation/protocols'
import { mockEmailValidator } from '@/__tests__/validation/mocks'

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
