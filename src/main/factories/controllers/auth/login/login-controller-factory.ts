import { LoginController } from '../../../../../presentation/controllers/auth/login/login-controller'
import { Controller } from '../../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'
import { makeDbAuthentication } from '../../../usecases/account/authentication/db-authentication-factory'
import { makeLoginValidation } from './login-validation-factory'

export const makeLoginController = (): Controller => {
  const loginControlller = new LoginController(makeLoginValidation(), makeDbAuthentication())
  return makeLogControllerDecorator(loginControlller)
}
