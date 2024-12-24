
import { makeSignUpValidation } from './signup-validation-factory'
import { makeDbAddAccount } from '@/main/factories/usecases/account/add-account/db-add-account-factory'
import { makeDbAuthentication } from '@/main/factories/usecases/account/authentication/db-authentication-factory'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { SignUpController } from '@/presentation/controllers/auth/signup/signup-controller'
import { Controller } from '@/presentation/protocols'

export const makeSignUpController = (): Controller => {
  const signupController = new SignUpController(makeDbAddAccount(), makeSignUpValidation(), makeDbAuthentication())
  return makeLogControllerDecorator(signupController)
}
