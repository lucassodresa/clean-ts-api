import { makeLoginValidation } from './login-validation-factory'
import { makeDbAuthentication } from '@/main/factories/usecases/account/authentication/db-authentication-factory'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { LoginController } from '@/presentation/controllers/auth/login/login-controller'
import { Controller } from '@/presentation/protocols'

export const makeLoginController = (): Controller => {
  const loginControlller = new LoginController(makeLoginValidation(), makeDbAuthentication())
  return makeLogControllerDecorator(loginControlller)
}
