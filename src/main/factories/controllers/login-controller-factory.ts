import { makeLoginValidation, makeDbAuthentication, makeLogControllerDecorator } from '@/main/factories'
import { LoginController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeLoginController = (): Controller => {
  const loginControlller = new LoginController(makeLoginValidation(), makeDbAuthentication())
  return makeLogControllerDecorator(loginControlller)
}
