
import { makeDbAddAccount, makeDbAuthentication, makeLogControllerDecorator, makeSignUpValidation } from '@/main/factories'
import { SignUpController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeSignUpController = (): Controller => {
  const signupController = new SignUpController(makeDbAddAccount(), makeSignUpValidation(), makeDbAuthentication())
  return makeLogControllerDecorator(signupController)
}
